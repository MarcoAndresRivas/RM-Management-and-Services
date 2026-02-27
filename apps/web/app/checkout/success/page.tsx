import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Package, Receipt } from "lucide-react";

export default function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const orderId = searchParams.orderId as string;
    const folio = searchParams.folio as string;

    return (
        <div className="min-h-screen bg-[#F3F4F6] dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-neutral-200 dark:border-neutral-800 max-w-lg w-full text-center backdrop-blur-sm bg-white/80 dark:bg-neutral-900/80">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                    ¡Pago Exitoso!
                </h1>
                <p className="text-neutral-500 mb-8">
                    Gracias por tu compra. Hemos recibido tu pedido y lo estamos preparando.
                </p>

                <div className="bg-neutral-50/50 dark:bg-neutral-800/30 rounded-2xl p-6 mb-8 text-left border border-neutral-100 dark:border-neutral-700/50">
                    <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-neutral-400">
                        <Package className="w-4 h-4" /> Información del Pedido
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-800">
                        <span className="text-neutral-500 text-sm font-medium">Nº de Orden</span>
                        <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">{orderId || "#10042"}</span>
                    </div>
                    {folio && (
                        <div className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-800">
                            <div className="flex flex-col">
                                <span className="text-neutral-500 text-sm font-medium">Folio DTE</span>
                                <span className="text-[10px] text-green-600 dark:text-green-400 font-bold">SII VALIDADO</span>
                            </div>
                            <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">#{folio}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center py-2">
                        <span className="text-neutral-500 text-sm font-medium">Estado de Pago</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Pagado
                        </span>
                    </div>
                </div>

                {folio && (
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                            <Receipt className="w-4 h-4 text-blue-500" /> PDF Boleta
                        </a>
                        <a
                            href="#"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                            <Receipt className="w-4 h-4 text-orange-500" /> XML SII
                        </a>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Link href="/dashboard/orders" className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 dark:bg-white px-6 py-4 font-bold text-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-neutral-200 dark:shadow-none">
                        Ver mis Órdenes <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link href="/products" className="w-full flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-neutral-900 px-6 py-4 font-bold text-black dark:text-white border border-neutral-200 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-100 transition-all duration-200">
                        Seguir Comprando
                    </Link>
                </div>
            </div>
        </div>
    );
}
