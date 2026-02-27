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
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ${scrolled
                ? "py-0"
                : "py-2"
                }`}
        >
            <div className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${scrolled
                ? "bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]"
                : "bg-white/5 backdrop-blur-md border border-white/5"}`}>

                {/* Left - Navigation Items */}
                <nav className="hidden md:flex items-center gap-8">
                    <div className="relative group">
                        <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/70 transition-colors hover:text-white">
                            Sectores
                            <span className="text-[8px] opacity-40 group-hover:rotate-180 transition-transform duration-300">▼</span>
                        </button>

                        {/* Elegant Dropdown */}
                        <div className="absolute left-[-20px] top-full mt-4 w-72 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl p-3 shadow-2xl">
                                <div className="p-3 mb-2 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Corporativo</p>
                                </div>

                                <div className="space-y-1">
                                    <Link href="/stores/conveniencia" className="flex items-center justify-between group/item rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/5 transition-all">
                                        <span className="text-neutral-300 group-hover/item:text-white">RM Conveniencia</span>
                                        <span className="text-[10px] text-green-500 opacity-0 group-hover/item:opacity-100 transition-opacity uppercase font-bold">Store</span>
                                    </Link>
                                    <Link href="/stores/tech" className="flex items-center justify-between group/item rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/5 transition-all">
                                        <span className="text-neutral-300 group-hover/item:text-white">RM Tech & Electronics</span>
                                        <span className="text-[10px] text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity uppercase font-bold">Tech</span>
                                    </Link>
                                    <Link href="/services/ingenieria" className="flex items-center justify-between group/item rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/5 transition-all">
                                        <span className="text-neutral-300 group-hover/item:text-white">RM Ingeniería</span>
                                        <span className="text-[10px] text-orange-500 opacity-0 group-hover/item:opacity-100 transition-opacity uppercase font-bold">Eng</span>
                                    </Link>
                                    <Link href="/services/dental" className="flex items-center justify-between group/item rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/5 transition-all">
                                        <span className="text-neutral-300 group-hover/item:text-white">RM Dental</span>
                                        <span className="text-[10px] text-cyan-500 opacity-0 group-hover/item:opacity-100 transition-opacity uppercase font-bold">Health</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/products" className="text-[10px] font-black uppercase tracking-widest text-white/70 transition-colors hover:text-white">
                        Catálogo
                    </Link>
                </nav>

                {/* Center - Logo */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-all duration-300">
                            RM
                        </div>
                        <span className="font-black text-base tracking-tighter text-white">
                            MANAGEMENT
                        </span>
                    </Link>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
                        title="Dashboard"
                    >
                        <User className="w-5 h-5" />
                    </Link>

                    <Link href="/cart" className="relative group">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-white/5">
                            <ShoppingBag className="w-4 h-4" />
                            <span>Cart</span>
                            {mounted && totalItems > 0 && (
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white ring-2 ring-white">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
