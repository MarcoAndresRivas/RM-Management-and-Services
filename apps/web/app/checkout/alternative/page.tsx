import React from "react";
import Link from "next/link";
import { Wallet, QrCode } from "lucide-react";

export default function AlternativePaymentPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const method = searchParams.method || "Alternative";
    const orderId = searchParams.orderId;

    return (
        <div className="min-h-screen bg-[#F3F4F6] dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 max-w-md w-full text-center shadow-sm border border-neutral-200 dark:border-neutral-800">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-8 h-8" />
                </div>

                <h1 className="text-2xl font-bold mb-2">Pay with {method}</h1>
                <p className="text-neutral-500 mb-8 text-sm">
                    Scan the QR code below with your {method} app to complete the payment for order {orderId}.
                </p>

                <div className="bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-8 mb-8 flex items-center justify-center">
                    <QrCode className="w-48 h-48 text-black dark:text-white opacity-20" />
                </div>

                <button className="w-full rounded-xl bg-black dark:bg-white px-6 py-3.5 font-bold text-white dark:text-black mb-4 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors">
                    I've completed the payment
                </button>

                <Link href="/checkout" className="text-sm font-semibold underline underline-offset-4 hover:text-neutral-500 transition-colors">
                    Cancel and return
                </Link>
            </div>
        </div>
    );
}
