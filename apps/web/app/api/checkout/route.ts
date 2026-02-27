import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { prisma } from "@repo/db";

// Replace with environment variable in production
const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || "TEST-000000000-000000-0000000000-000000000"
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { items, documentType, customerData, paymentMethod } = body;

        // 1. Create Order in Database first (Pending state)
        // Here we'd typically associate it with the current tenant/user
        // For demo purposes, we assume a default Tenant exists or will be created
        let tenant = await prisma.tenant.findFirst();
        if (!tenant) {
            tenant = await prisma.tenant.create({
                data: { name: "Default Tenant", slug: "default" }
            });
        }

        const order = await prisma.order.create({
            data: {
                tenantId: tenant.id,
                totalAmount: items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
                status: "PENDING",
                paymentMethod: paymentMethod, // e.g. "MERCADOPAGO"
                items: {
                    create: items.map((item: any) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        unitPrice: item.price,
                        totalPrice: item.price * item.quantity,
                    }))
                }
            }
        });

        // 2. Based on payment method, generate the specific checkout URL
        if (paymentMethod === "MERCADOPAGO") {
            const preference = new Preference(client);
            const response = await preference.create({
                body: {
                    items: items.map((item: any) => ({
                        id: item.id,
                        title: item.name,
                        quantity: item.quantity,
                        unit_price: item.price,
                        currency_id: "CLP"
                    })),
                    back_urls: {
                        success: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/success?orderId=${order.id}`,
                        failure: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/failure`,
                        pending: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/pending`,
                    },
                    auto_return: "approved",
                    external_reference: order.id,
                    metadata: {
                        documentType: documentType,
                        customerData: customerData
                    }
                }
            });

            return NextResponse.json({ url: response.init_point });
        }

        // Handle other payment integrations (MACH, Webpay, Crypto) here using scaffolding
        if (paymentMethod === "WEBPAY") {
            return NextResponse.json({ url: `/checkout/webpay/init?orderId=${order.id}` });
        }

        if (paymentMethod === "CRYPTO" || paymentMethod === "MACH" || paymentMethod === "TENPO") {
            return NextResponse.json({ url: `/checkout/alternative?method=${paymentMethod}&orderId=${order.id}` });
        }

        return NextResponse.json({ error: "Método de pago no soportado." }, { status: 400 });

    } catch (error) {
        console.error("Error creating checkout preference:", error);
        return NextResponse.json({ error: "Error procesando el pago." }, { status: 500 });
    }
}
