"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason");

    let title = "Payment Failed";
    let desc = "There was a problem processing your payment.";

    if (reason === "aborted") {
        title = "Payment Cancelled";
        desc = "You cancelled the payment process before it finished.";
    } else if (reason === "rejected") {
        title = "Payment Rejected";
        desc = "Your card was rejected or there were insufficient funds.";
    } else if (reason === "order_not_found") {
        title = "Order Not Found";
        desc = "We could not locate your order in our system.";
    }

    return (
        <div className="text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 max-w-md w-full">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-neutral-900 dark:text-white">{title}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8">{desc}</p>

            <div className="flex flex-col gap-3">
                <Link
                    href="/cart"
                    className="flex items-center justify-center gap-2 rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:scale-[1.02] active:scale-95 transition-transform"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </Link>
                <Link
                    href="/products"
                    className="flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Return to Shop
                </Link>
            </div>
        </div>
    );
}

export default function CheckoutErrorPage() {
    return (
        <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
            <Suspense fallback={<div className="animate-pulse w-96 h-64 bg-neutral-200 rounded-2xl" />}>
                <ErrorContent />
            </Suspense>
        </div>
    );
}
