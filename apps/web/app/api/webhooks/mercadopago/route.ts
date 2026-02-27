import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

/**
 * Webhook for MercadoPago.
 * Receives payment status updates. When a payment is approved,
 * it updates the Order status and triggers the DTE emission.
 */
export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        // MercadoPago usually sends query params like topic=payment & id=123
        // Or it sends a JSON body with { action: "payment.created", data: { id: "123" } }

        // For security in a real app, verify the signature!

        const body = await req.json().catch(() => ({}));

        // Mocking the extraction of external_reference (our orderId) from the MP API or the body
        // Real implementation fetches the payment by ID from MercadoPago API to get external_reference

        // Since this is a test/scaffolding, let's assume we receive the orderId in the body or query
        const paymentId = url.searchParams.get("data.id") || body?.data?.id;
        const orderId = body?.external_reference || url.searchParams.get("external_reference");

        if (orderId) {
            console.log(`[Webhook MP] Payment approved for Order: ${orderId}`);

            // 1. Update Order Status
            const order = await prisma.order.update({
                where: { id: orderId },
                data: {
                    status: "PAID",
                    paymentId: paymentId?.toString(),
                }
            });

            // 2. Trigger DTE Emission (Internal Call or direct invocation)
            // Simulating it directly here for the webhook script:

            const documentType: string = "BOLETA"; // Needs to be fetched from order metadata
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
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error in MercadoPago webhook:", error);
        return NextResponse.json({ error: "Webhook Error" }, { status: 500 });
    }
}
