import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

/**
 * Endpoint for simulating the emission of DTEs (Documentos Tributarios Electrónicos)
 * in Chile (Boleta o Factura Electrónica), typically via LibreDTE, Haulmer or SimpleBoleta.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderId, documentType, customerData } = body;

        if (!orderId || !documentType) {
            return NextResponse.json({ error: "orderId and documentType are required" }, { status: 400 });
        }

        // Fetch the order and tenant
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { tenant: true, customer: true, items: true }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Simulating the external API call (e.g. to SII or external provider)
        console.log(`[DTE API Sim] Emitting ${documentType} for Order ${orderId}...`);
        console.log(`[DTE API Sim] Amount: $${order.totalAmount} CLP`);
        if (documentType === "FACTURA" && customerData) {
            console.log(`[DTE API Sim] Business Details: RUT ${customerData.rut}, Company: ${customerData.companyName}`);
        }

        // Create the DTE record in the database
        const folio = Math.floor(Math.random() * 10000) + 1; // Simulated folio

        const dteRecord = await prisma.documentDTE.create({
            data: {
                tenantId: order.tenantId,
                orderId: order.id,
                type: documentType === "FACTURA" ? "FACTURA_ELECTRONICA" : "BOLETA_ELECTRONICA",
                folio: folio,
                xmlUrl: `https://sii.mock.cl/dte/${folio}.xml`,
                pdfUrl: `https://sii.mock.cl/dte/${folio}.pdf`,
            }
        });

        console.log(`[DTE API Sim] Successfully emitted with Folio ${folio}`);

        return NextResponse.json({
            success: true,
            message: "DTE emitted successfully",
            dte: dteRecord
        });

    } catch (error) {
        console.error("Error emitting DTE:", error);
        return NextResponse.json({ error: "Internal server error during DTE emission" }, { status: 500 });
    }
}
