import Link from "next/link";
import { ArrowLeft, Cpu, ShoppingBag } from "lucide-react";

export default function TechStorePage() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
            <section className="relative flex h-72 items-end overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 px-6 pb-10">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,_#fff,_transparent)]" />
                <div className="relative z-10 flex flex-col gap-4">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 uppercase tracking-widest hover:text-white transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> RM Holding
                    </Link>
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Electrónica & Tecnología</span>
                        <h1 className="text-4xl font-black text-white tracking-tight mt-1">RM Tech & Electronics</h1>
                        <p className="text-blue-200 mt-2">Tecnología premium, al mejor precio.</p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto max-w-6xl px-4 py-12">
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-10 text-center shadow-sm">
                    <Cpu className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                    <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Tienda Tech</h2>
                    <p className="text-neutral-500 mb-8 max-w-md mx-auto">
                        Encuentra los últimos artículos en electrónica, computación, iluminación y equipos eléctricos del rubro.
                    </p>
                    <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-bold text-white hover:scale-105 transition-transform active:scale-95">
                        <ShoppingBag className="w-4 h-4" /> Ver Catálogo
                    </Link>
                </div>
            </section>
        </div>
    );
}
