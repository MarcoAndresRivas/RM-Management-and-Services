"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet, Bitcoin, CheckCircle2, MapPin, Building, Briefcase, ChevronRight, Lock } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { items, getTotals } = useCartStore();
    const { totalPrice } = getTotals();

    // "Boleta" is simpler standard receipt in Chile, "Factura" is B2B invoice
    const [documentType, setDocumentType] = useState<"BOLETA" | "FACTURA">("BOLETA");
    const [paymentMethod, setPaymentMethod] = useState<"MERCADOPAGO" | "WEBPAY" | "CRYPTO" | "MACH" | "TENPO">("MERCADOPAGO");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (items.length === 0) {
            router.push("/cart");
        }
    }, [items, router]);

    if (!mounted || items.length === 0) return null;

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                body: JSON.stringify({
                    items, documentType, paymentMethod, customerData: {}
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Payment initialization failed");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error redirecting to checkout", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] dark:bg-neutral-950 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Minimalist Header for Checkout */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight">Secure Checkout</h1>
                    <p className="text-neutral-500 mt-2 flex items-center justify-center gap-1 text-sm">
                        <Lock className="w-4 h-4" /> Powered by high-grade encryption
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Main Checkout Form Area */}
                    <div className="lg:col-span-7 flex flex-col gap-6">

                        {/* 1. Contact Info & Document Type (SII) */}
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs">1</span>
                                    Billing Information
                                </h2>
                            </div>

                            <div className="p-6">
                                {/* Custom Toggle for Boleta/Factura */}
                                <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl mb-6">
                                    <button
                                        onClick={() => setDocumentType("BOLETA")}
                                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${documentType === "BOLETA" ? "bg-white dark:bg-neutral-700 shadow-sm" : "text-neutral-500 hover:text-black dark:hover:text-white"}`}
                                    >
                                        Standard Receipt
                                    </button>
                                    <button
                                        onClick={() => setDocumentType("FACTURA")}
                                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${documentType === "FACTURA" ? "bg-white dark:bg-neutral-700 shadow-sm" : "text-neutral-500 hover:text-black dark:hover:text-white"}`}
                                    >
                                        Business Invoice (B2B)
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-neutral-500 uppercase">First Name</label>
                                            <input type="text" className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 px-0 py-2 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none" placeholder="John" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-neutral-500 uppercase">Last Name</label>
                                            <input type="text" className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 px-0 py-2 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-neutral-500 uppercase">Email Address</label>
                                        <input type="email" className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 px-0 py-2 focus:border-black dark:focus:border-white focus:ring-0 transition-colors outline-none" placeholder="john.doe@example.com" />
                                    </div>

                                    {documentType === "FACTURA" && (
                                        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 animate-in fade-in slide-in-from-top-4 space-y-4">
                                            <h3 className="text-sm font-bold flex items-center gap-2"><Building className="w-4 h-4 text-neutral-400" /> Company Details (SII)</h3>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-neutral-500 uppercase">Company Name / Razón Social</label>
                                                <input type="text" className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 px-0 py-2 focus:border-black dark:focus:border-white transition-colors outline-none" placeholder="TechCorp SpA" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-neutral-500 uppercase">Tax ID / RUT</label>
                                                    <input type="text" className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 px-0 py-2 focus:border-black dark:focus:border-white transition-colors outline-none" placeholder="77.123.456-7" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-neutral-500 uppercase">Business Line (Giro)</label>
                                                    <input type="text" className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-800 px-0 py-2 focus:border-black dark:focus:border-white transition-colors outline-none" placeholder="Software Dev" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 2. Payment Method */}
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                            <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs">2</span>
                                    Payment Method
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { id: "MERCADOPAGO", label: "Mercado Pago", desc: "Cards & Cash", icon: <CreditCard className="w-6 h-6 text-[#009EE3]" /> },
                                        { id: "WEBPAY", label: "Webpay Plus", desc: "Debit/Credit", icon: <CreditCard className="w-6 h-6 text-red-500" /> },
                                        { id: "CRYPTO", label: "Pay with Crypto", desc: "BTC, ETH, USDC", icon: <Bitcoin className="w-6 h-6 text-yellow-500" /> },
                                        { id: "MACH", label: "MACH", desc: "Digital Wallet", icon: <Wallet className="w-6 h-6 text-purple-600" /> }
                                    ].map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setPaymentMethod(method.id as any)}
                                            className={`flex items-start p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === method.id
                                                    ? "border-black dark:border-white bg-neutral-50 dark:bg-neutral-800"
                                                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                                                }`}
                                        >
                                            <div className="mt-0.5">{method.icon}</div>
                                            <div className="ml-3 flex-1">
                                                <div className="font-bold text-sm text-neutral-900 dark:text-white">{method.label}</div>
                                                <div className="text-xs text-neutral-500 mt-0.5">{method.desc}</div>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-black dark:border-white' : 'border-neutral-300'}`}>
                                                {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar - Cart Summary (Stripe style) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 sticky top-28">
                            <h3 className="font-bold text-lg mb-6">Order Summary</h3>

                            <div className="flex flex-col gap-4 mb-6 max-h-[350px] overflow-auto pr-2">
                                {items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                                            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-black text-white text-[10px] font-bold rounded-full">{item.quantity}</span>
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <span className="font-semibold text-sm line-clamp-2">{item.name}</span>
                                            <span className="text-xs text-neutral-500 mt-1">Qty: {item.quantity}</span>
                                        </div>
                                        <div className="font-bold text-sm flex items-center">
                                            {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm border-t border-neutral-100 dark:border-neutral-800 pt-6 mb-6">
                                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-black dark:text-white">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                                    <span>Shipping</span>
                                    <span className="font-medium text-black dark:text-white">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8 border-t border-neutral-100 dark:border-neutral-800 pt-6">
                                <span className="text-lg font-bold">Total due</span>
                                <span className="text-2xl font-extrabold">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(totalPrice)}</span>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-black dark:bg-white px-8 py-4.5 font-bold text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Pay with {paymentMethod === "MERCADOPAGO" ? "Mercado Pago" : paymentMethod === "WEBPAY" ? "Webpay" : paymentMethod}
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
