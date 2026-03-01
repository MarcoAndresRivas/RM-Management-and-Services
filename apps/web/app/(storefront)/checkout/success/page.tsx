import React, { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Package, Receipt, ArrowLeft, ExternalLink } from "lucide-react";
import { prisma } from "@repo/db";

export default async function CheckoutSuccessPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const orderId = searchParams.orderId as string;

    // Attempt to fetch real order data if ID is provided
    let order = null;
    if (orderId) {
        order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                dte: true,
                items: {
                    include: { product: true }
                }
            }
        });
    }

    const folio = order?.dte?.folio || searchParams.folio as string;

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-green-50 to-transparent dark:from-green-950/20 dark:to-transparent pointer-events-none -z-10" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100/50 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] max-w-xl w-full text-center backdrop-blur-xl">
                <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto shadow-inner relative z-10">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-125 -z-10 animate-pulse" />
                </div>

                <h1 className="text-4xl font-black mb-3 tracking-tight bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-500 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
                    ¡Pedido Confirmado!
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-8 leading-relaxed">
                    Hemos recibido con éxito tu pago. <br />
                    Un correo de confirmación ha sido enviado a tu bandeja de entrada.
                </p>

                <div className="bg-white dark:bg-neutral-800/50 rounded-3xl p-6 mb-10 text-left border border-neutral-100 dark:border-neutral-700/50 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                        <Package className="w-3.5 h-3.5 text-green-500" /> Detalle del Pedido
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">Nº de Orden</span>
                            <span className="font-mono bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                                {orderId ? orderId.substring(0, 8) : "#10042"}
                            </span>
                        </div>

                        {folio && (
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Documento Tributario</span>
                                    <span className="text-[10px] text-green-600 dark:text-green-400 font-black uppercase tracking-widest mt-0.5">Validado por SII</span>
                                </div>
                                <span className="font-bold text-neutral-900 dark:text-neutral-100">Folio #{folio}</span>
                            </div>
                        )}

                        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center group">
                            <span className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Total Pagado</span>
                            <span className="text-xl font-black text-neutral-900 dark:text-white transform group-hover:scale-105 transition-transform">
                                {order ? new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(order.totalAmount) : "$15.000"}
                            </span>
                        </div>
                    </div>
                </div>

                {folio && (
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <a
                            href={order?.dte?.pdfUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-4 px-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-bold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all hover:shadow-md"
                        >
                            <Receipt className="w-4 h-4 text-blue-500" /> PDF Boleta
                            <ExternalLink className="w-3 h-3 text-neutral-300" />
                        </a>
                        <a
                            href={order?.dte?.xmlUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-4 px-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-bold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all hover:shadow-md"
                        >
                            <Receipt className="w-4 h-4 text-orange-500" /> XML SII
                            <ExternalLink className="w-3 h-3 text-neutral-300" />
                        </a>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <Link href="/products" className="w-full flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 dark:bg-white h-16 font-black text-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)] dark:shadow-none uppercase tracking-widest text-sm">
                        Seguir Comprando <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                    <Link href="/" className="w-full h-16 flex items-center justify-center gap-2 rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 font-extrabold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all text-sm uppercase tracking-wider">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Volver al Inicio
                    </Link>
                </div>

                <p className="mt-12 text-neutral-400 dark:text-neutral-500 text-[10px] font-medium uppercase tracking-[0.3em] font-mono">
                    RM Management & Services · Chile 2026
                </p>
            </div>
        </div>
    );
}
