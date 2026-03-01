import { NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { sendOrderConfirmationEmail } from "@/lib/email";

/**
 * Webhook for MercadoPago.
 * Receives payment status updates. When a payment is approved,
 * it updates the Order status and triggers the DTE emission.
 */
export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const body = await req.json().catch(() => ({}));

        const paymentId = url.searchParams.get("data.id") || body?.data?.id;
        const orderId = body?.external_reference || url.searchParams.get("external_reference") || body?.data?.external_reference;

        if (orderId) {
            console.log(`[Webhook MP] Payment approved for Order: ${orderId}`);

            // 1. Update Order Status
            const order = await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: "PAID",
                    paymentId: paymentId?.toString(),
                },
                include: {
                    customer: true
                }
            });

            // 2. Trigger DTE Emission
            const documentType: string = "BOLETA";
            const folio = Math.floor(Math.random() * 10000) + 1;

            await prisma.documentDTE.create({
                data: {
                    tenantId: order.tenantId,
                    orderId: order.id,
                    type: documentType === "FACTURA" ? "FACTURA_ELECTRONICA" : "BOLETA_ELECTRONICA",
                    folio: folio,
                    xmlUrl: `https://sii.mock.cl/dte/${folio}.xml`,
                    pdfUrl: `https://sii.mock.cl/dte/${folio}.pdf`,
                }
            });

            console.log(`[Webhook MP] DTE emitted successfully for Order: ${orderId}`);

            // 3. Send Transactional Email
            if (order.customer && order.customer.email) {
                await sendOrderConfirmationEmail(order.id, order.customer.email, order.totalAmount);
                console.log(`[Webhook MP] Confirmation email sent to: ${order.customer.email}`);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in MercadoPago webhook:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
    }
}

