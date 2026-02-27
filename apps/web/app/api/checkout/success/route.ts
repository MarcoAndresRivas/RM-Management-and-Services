import { NextResponse } from "next/server";
import { prisma } from "@repo/db";

// Simulated external DTE API call (e.g. LibreDTE, Haulmer)
async function generateDTE(orderId: string, documentType: string, customerData: any) {
    console.log(`[DTE API SIMULATION] Generating ${documentType} for Order ${orderId}...`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
        success: true,
        folio: Math.floor(Math.random() * 10000) + 1,
        type: documentType === "FACTURA" ? "FACTURA_ELECTRONICA" : "BOLETA_ELECTRONICA",
        xmlUrl: `https://dte-provider.com/download/xml/${orderId}`,
        pdfUrl: `https://dte-provider.com/download/pdf/${orderId}`,
    };
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const orderId = searchParams.get("orderId");
        const paymentId = searchParams.get("payment_id"); // From MercadoPago
        const status = searchParams.get("status");

        if (!orderId || status !== "approved") {
            return NextResponse.redirect(new URL("/checkout/failure", req.url));
        }

        // 1. Update Order Status to PAID
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: "PAID",
                paymentId: paymentId
            }
        });

        // 2. Generate DTE (Electronic Boleta/Factura) via external provider API simulation
        // In a real scenario, this metadata would be passed via MP webhook or retrieved from DB.
        // For this demonstration, we'll assume it's a BOLETA
        const dteResponse = await generateDTE(orderId, "BOLETA", {});

        if (dteResponse.success) {
            // 3. Save DTE record in our database
            await prisma.documentDTE.create({
                data: {
                    orderId: orderId,
                    tenantId: order.tenantId,
                    folio: dteResponse.folio,
                    type: dteResponse.type as any, // "BOLETA_ELECTRONICA" | "FACTURA_ELECTRONICA"
                    xmlUrl: dteResponse.xmlUrl,
                    pdfUrl: dteResponse.pdfUrl,
                }
            });
            console.log(`[DTE CREATION] Database DocumentDTE created with folio ${dteResponse.folio}`);
        }

        // Redirect to the success page UI
        return NextResponse.redirect(new URL(`/checkout/success?orderId=${orderId}&folio=${dteResponse.folio}`, req.url));

    } catch (error) {
        console.error("Error processing checkout success:", error);
        return NextResponse.redirect(new URL("/checkout/failure", req.url));
    }
}
