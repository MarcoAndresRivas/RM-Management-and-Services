"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/useCartStore";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";

export default function CartPage() {
    const [mounted, setMounted] = useState(false);
    const { items, removeItem, updateQuantity, getTotals } = useCartStore();
    const { totalPrice } = getTotals();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Previene hydration mismatch

    if (items.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
                <div className="max-w-md text-center p-8 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                    <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">Your Bag is Empty</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                        Looks like you haven't added anything to your cart yet. Discover our premium collection.
                    </p>
                    <Link
                        href="/products"
                        className="inline-flex w-full items-center justify-center rounded-full bg-black dark:bg-white px-8 py-3.5 text-sm font-semibold text-white dark:text-black hover:scale-[1.02] active:scale-95 transition-transform"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl font-extrabold tracking-tight mb-10">Review Your Bag.</h1>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-2 sm:p-6 shadow-sm border border-neutral-100 dark:border-neutral-800">
                            {items.map((item, index) => (
                                <div key={item.id} className={`flex flex-col sm:flex-row gap-6 py-6 ${index !== items.length - 1 ? 'border-b border-neutral-100 dark:border-neutral-800' : ''}`}>
                                    <div className="h-32 w-32 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden shrink-0 mx-auto sm:mx-0">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                                                <p className="text-sm text-neutral-500 mt-1">In Stock • Ships immediately</p>
                                            </div>
                                            <p className="font-bold text-lg whitespace-nowrap">
                                                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(item.price)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 sm:mt-0">
                                            <div className="flex items-center gap-1 border border-neutral-200 dark:border-neutral-700 rounded-full p-1 bg-neutral-50 dark:bg-neutral-800">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-neutral-700 transition-colors"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-sm font-medium text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-1"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="hidden sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-100 dark:border-neutral-800 sticky top-28">
                            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">Order Summary</h2>

                            <div className="space-y-4 mb-6 text-sm">
                                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                                    <span>Subtotal</span>
                                    <span className="text-neutral-900 dark:text-white font-medium">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                                    <span>Shipping Estimation</span>
                                    <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                                    <span>Taxes</span>
                                    <span className="text-neutral-900 dark:text-white font-medium">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 font-extrabold text-2xl">
                                <span>Total</span>
                                <span>{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(totalPrice)}</span>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full flex justify-between items-center rounded-full bg-black dark:bg-white px-6 py-4 font-bold text-white dark:text-black hover:scale-[1.02] active:scale-95 transition-transform"
                            >
                                <span>Checkout</span>
                                <ArrowRight className="w-5 h-5 opacity-70" />
                            </Link>

                            <div className="mt-6 flex items-start gap-3 bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl text-xs text-neutral-500 dark:text-neutral-400">
                                <ShieldCheck className="w-5 h-5 shrink-0 text-green-600" />
                                <p>Secure checkout guaranteed. 30-day return policy on all unworn items.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
