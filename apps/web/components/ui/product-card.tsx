"use client";

import React, { useState } from "react";
import { ShoppingBag, Star, Check } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: any }) {
    const addItem = useCartStore(state => state.addItem);
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"
        });

        setAddedToCart(true);
        toast.success(`${product.name} added to your bag`);

        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group flex flex-col relative w-full rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-neutral-800/50 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.01)] overflow-hidden"
        >
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-full z-0" />

            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 mix-blend-multiply dark:mix-blend-normal">
                <motion.img
                    src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800"}
                    alt={product.name}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="object-cover w-full h-full"
                    loading="lazy"
                />

                {product.stock <= 5 && product.stock > 0 && (
                    <span className="absolute top-4 left-4 bg-orange-100/90 backdrop-blur-sm text-orange-800 text-[10px] uppercase font-bold px-3 py-1.5 rounded-full shadow-sm">
                        Only {product.stock} left
                    </span>
                )}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center">
                        <span className="bg-black dark:bg-white text-white dark:text-black text-xs uppercase font-bold px-4 py-2 rounded-full shadow-md">
                            Out of stock
                        </span>
                    </div>
                )}
            </div>

            <div className="relative z-10 flex flex-col p-4 pt-5 flex-1 bg-white/40 dark:bg-neutral-900/40 rounded-xl mt-[-10px] backdrop-blur-md shadow-sm border border-white/50 dark:border-neutral-700/50">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                        {product.category?.name || "Premium Collection"}
                    </span>
                    <div className="flex items-center text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 inline-block mr-1" />
                        4.9
                    </div>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-2 line-clamp-1 text-neutral-900 dark:text-white" title={product.name}>
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(product.price)}
                    </span>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className={`flex h-11 w-11 items-center justify-center rounded-full shadow-md transition-colors ${addedToCart
                                ? "bg-green-500 text-white"
                                : "bg-black text-white dark:bg-white dark:text-black disabled:opacity-50 disabled:bg-neutral-200 dark:disabled:bg-neutral-800"
                            }`}
                        aria-label="Add to Cart"
                    >
                        {addedToCart ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-4 h-4" />}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
