"use client";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useEffect, useState } from "react";

export function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const getTotals = useCartStore((state) => state.getTotals);
    const { totalItems } = getTotals();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

                {/* Left - companies dropdown */}
                <nav className="hidden md:flex items-center gap-8 flex-1">
                    <div className="relative group">
                        <button className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:opacity-100 ${scrolled ? 'text-black dark:text-white' : 'text-white opacity-80'}`}>
                            Empresas ▾
                        </button>
                        <div className="absolute left-0 top-full mt-2 w-64 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 p-2 z-50">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-3 py-2">Tiendas Online</div>
                            <Link href="/stores/conveniencia" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-green-50 dark:hover:bg-green-950/20 text-neutral-700 dark:text-neutral-300 hover:text-green-700">🛒 RM Conveniencia</Link>
                            <Link href="/stores/tech" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950/20 text-neutral-700 dark:text-neutral-300 hover:text-blue-700">💻 RM Tech & Electronics</Link>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-3 py-2 mt-1">Servicios</div>
                            <Link href="/services/ingenieria" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-orange-50 dark:hover:bg-orange-950/20 text-neutral-700 dark:text-neutral-300 hover:text-orange-700">🔧 RM Ingeniería</Link>
                            <Link href="/services/dental" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-neutral-700 dark:text-neutral-300 hover:text-cyan-700">😊 RM Dental</Link>
                            <Link href="/services/estetica" className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-pink-50 dark:hover:bg-pink-950/20 text-neutral-700 dark:text-neutral-300 hover:text-pink-700">✨ RM Estética</Link>
                        </div>
                    </div>
                    <Link href="/products" className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:opacity-100 ${scrolled ? 'text-black dark:text-white' : 'text-white opacity-80'}`}>
                        Catálogo
                    </Link>
                </nav>

                {/* Logo */}
                <div className="flex-1 text-center md:text-center md:flex-none">
                    <Link href="/" className="inline-block transition-transform hover:scale-105">
                        <span className={`font-black text-xl tracking-tighter ${scrolled ? 'text-black dark:text-white' : 'text-white'}`}>
                            RM<span className="opacity-50 font-normal">HOLDING</span>
                        </span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center justify-end gap-5 flex-1">
                    <Link href="/dashboard" className={`hidden sm:block transition-colors hover:opacity-100 ${scrolled ? 'text-black dark:text-white' : 'text-white opacity-80'}`}>
                        <User className="w-5 h-5" />
                    </Link>

                    <Link href="/cart" className="relative group">
                        <button
                            className={`p-2 rounded-full transition-all ${scrolled
                                ? "bg-black text-white dark:bg-white dark:text-black hover:scale-105"
                                : "bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
                                }`}
                            aria-label="View Cart"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {mounted && totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-black">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </Link>
                </div>

            </div>
        </header>
    );
}
