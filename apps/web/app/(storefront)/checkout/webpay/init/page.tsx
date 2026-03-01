import React from "react";
import Link from "next/link";
import { CreditCard, Loader2 } from "lucide-react";

export default function WebpayInitPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const orderId = searchParams.orderId as string;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] dark:bg-neutral-950 p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 max-w-md w-full text-center shadow-sm border border-neutral-200 dark:border-neutral-800">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
                    <CreditCard className="w-8 h-8 relative z-10" />
                </div>

                <h1 className="text-2xl font-bold mb-3">Connecting to Webpay Plus</h1>
                <p className="text-neutral-500 mb-8 text-sm">
                    Please wait while we securely redirect you to Transbank's payment gateway for Order {orderId}.
                </p>

                <div className="flex justify-center mb-8">
                    <Loader2 className="w-8 h-8 animate-spin text-black dark:text-white" />
                </div>

                <div className="text-xs text-neutral-400">
                    (Scaffolding note: In a real implementation, you will execute a POST request to Transbank's API and auto-submit a form with token_ws)
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                    <Link href="/checkout" className="text-sm font-semibold underline underline-offset-4 hover:text-red-500 transition-colors">
                        Cancel and return to checkout
                    </Link>
                </div>
            </div>
        </div>
    );
}
