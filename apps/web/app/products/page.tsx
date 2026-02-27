import React from "react";
import { ArrowRight } from "lucide-react";
import { prisma } from "@repo/db";
import { ProductCard } from "@/components/ui/product-card";

// Next.js Server Component
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    // We only fetch products for the main (first) tenant for Demo purposes
    const tenant = await prisma.tenant.findFirst();

    // Fetch products dynamically from DB
    const products = await prisma.product.findMany({
        where: tenant ? { tenantId: tenant.id } : undefined,
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pb-24">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black dark:bg-black text-white py-24 sm:py-32">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=2000" alt="Hero background" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                <div className="relative container mx-auto px-4 z-10 flex flex-col items-center text-center">
                    <span className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md ring-1 ring-white/20">
                        Spring Collection 2026
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
                        Elevate Your Everyday <br className="hidden md:block" /> Experience.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mb-10 font-light animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Discover our curated selection of premium products designed for the modern lifestyle. Fully synced with our inventory.
                    </p>
                    <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-all active:scale-95 shadow-xl shadow-white/10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        Explore Collection <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            {/* Catalog Grid */}
            <section className="container mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mt-2">The most sought-after pieces of the season.</p>
                    </div>
                    <div className="hidden md:flex gap-4">
                        <button className="text-sm font-medium border-b-2 border-black dark:border-white pb-1 transition-colors">All</button>
                        <button className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors pb-1">Electronics</button>
                        <button className="text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors pb-1">Accessories</button>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                        <h3 className="text-xl font-bold mb-2">No products found</h3>
                        <p className="text-neutral-500">The catalog is currently empty. Check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
