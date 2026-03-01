import { NextRequest, NextResponse } from "next/server";
import { WebpayPlus, Options, Environment, IntegrationApiKeys, IntegrationCommerceCodes } from "transbank-sdk";
import { prisma } from "@repo/db";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const token = formData.get("token_ws") as string;
    const isAborted = formData.get("TBK_TOKEN");

    // Si la operación fue abortada o hubo timeout
    if (isAborted || !token) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/error?reason=aborted`);
    }

    try {
        const tx = new WebpayPlus.Transaction(
            new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
        );

        // Confirmar transacción con Transbank
        const commitResponse = await tx.commit(token);

        // Buscar la orden por buy_order, que mapeamos con orderNumber
        // Convert buyOrder back to BigInt equivalent using orderNumber logic
        const orderNumberFromTbk = parseInt(commitResponse.buy_order, 10);

        const order = await prisma.order.findFirst({
            where: { orderNumber: orderNumberFromTbk },
        });

        if (!order) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/error?reason=order_not_found`);
        }

        if (commitResponse.status === "AUTHORIZED") {
            // Update order status to paid
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "PAID",
                    paymentId: commitResponse.authorization_code,
                    paymentStatus: commitResponse.status,
                }
            });

            // Simulate DTE Generation (In real life this would call an API like relbase/libredte)
            await prisma.documentDTE.create({
                data: {
                    tenantId: order.tenantId,
                    orderId: order.id,
                    type: "BOLETA_ELECTRONICA",
                    status: "GENERATED",
                    folio: Math.floor(Math.random() * 90000) + 10000,
                    issuedAt: new Date(),
                }
            });

            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success`);
        } else {
            // Update order status to failed
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: "CANCELLED",
                    paymentId: commitResponse.authorization_code,
                    paymentStatus: commitResponse.status,
                }
            });
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/error?reason=rejected`);
        }
    } catch (error) {
        console.error("Transbank Commit Error:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/error?reason=system_error`);
    }
}

// Transbank sometimes hits the return URL with GET if the user navigated awkwardly
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token_ws");
    const isAborted = searchParams.get("TBK_TOKEN");

    if (isAborted || !token) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/error?reason=aborted`);
    }

    // Usually GET means it's coming from an intermediate state where it was already processed
    // Or it's a timeout.
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/error?reason=unexpected`);
}
