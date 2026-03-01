import { NextRequest, NextResponse } from "next/server";
import { WebpayPlus, Options, Environment, IntegrationApiKeys, IntegrationCommerceCodes } from "transbank-sdk";
import { prisma } from "@repo/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const { orderData } = await req.json();
        const session = await auth();

        if (!orderData || !orderData.items || orderData.items.length === 0) {
            return NextResponse.json({ error: "No order data provided" }, { status: 400 });
        }

        const tenant = await prisma.tenant.findFirst();
        if (!tenant) throw new Error("No default tenant found");

        const customerId = session?.user?.id; // In a full app, map session email to customer or create one

        // We assume items come in from useCartStore: { id: "...", quantity: 1 }
        // 1. Calculate total and create pending order locally
        let totalAmount = 0;
        const productsParams = [];

        for (const i of orderData.items) {
            const product = await prisma.product.findUnique({ where: { id: i.id } });
            if (!product) continue;

            const itemTotal = product.price * i.quantity;
            totalAmount += itemTotal;
            productsParams.push({
                productId: product.id,
                quantity: i.quantity,
                unitPrice: product.price,
                totalPrice: itemTotal
            });
        }

        if (totalAmount === 0) {
            return NextResponse.json({ error: "Cart is empty or invalid" }, { status: 400 });
        }

        const order = await prisma.order.create({
            data: {
                tenantId: tenant.id,
                // Using null customerId if guest, otherwise link
                customerId: null, // Hardcoded to guest for demo simplicity if no explicit mapping
                status: "PENDING",
                paymentMethod: "WEBPAY_PLUS",
                totalAmount,
                items: {
                    create: productsParams
                }
            }
        });

        // 2. Initialize Webpay Plus
        // For production, use process.env.TBK_API_KEY_ID & process.env.TBK_API_KEY_SECRET
        // For now, use the Integration Defaults built into the SDK
        const tx = new WebpayPlus.Transaction(
            new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
        );

        // Required parameters
        const buyOrder = order.orderNumber.toString();
        const sessionId = `SESSION_${order.id}`;
        const amount = totalAmount;
        const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/checkout/webpay/return`;

        const createResponse = await tx.create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
        );

        // createResponse gives us { token, url }
        // We return these to the client to submit a form to Transbank
        return NextResponse.json({
            token: createResponse.token,
            url: createResponse.url,
            orderId: order.id,
        });

    } catch (error: any) {
        console.error("Transbank Init Error:", error);
        return NextResponse.json({ error: error?.message || "Failed to initialize Webpay Plus" }, { status: 500 });
    }
}
