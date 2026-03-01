"use client";

import { motion, Variants } from "framer-motion";
import { Users, Building, Activity, DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

interface DashboardClientProps {
    revenue: number;
    users: number;
    products: number;
    ordersCount: number;
}

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function DashboardClient({ revenue, users, products, ordersCount }: DashboardClientProps) {
    const cards = [
        {
            title: "Total Revenue",
            icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
            value: new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(revenue),
            trend: "+12.5% vs last month",
            trendUp: true
        },
        {
            title: "Active Orders",
            icon: <ShoppingCart className="h-5 w-5 text-indigo-500" />,
            value: ordersCount.toString(),
            trend: "+4.2% vs last month",
            trendUp: true
        },
        {
            title: "Total Products",
            icon: <Package className="h-5 w-5 text-neutral-500" />,
            value: products.toString(),
            trend: "2 low stock alerts",
            trendUp: false
        },
        {
            title: "Registered Users",
            icon: <Users className="h-5 w-5 text-blue-500" />,
            value: users.toString(),
            trend: "+18 new this week",
            trendUp: true
        }
    ];

    return (
        <motion.div
            className="flex flex-col gap-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={item} className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                    Overview
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400">
                    Welcome back. Here is what's happening with your store today.
                </p>
            </motion.div>

            <motion.div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
                variants={container}
            >
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        variants={item}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="relative overflow-hidden rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.01)]"
                    >
                        {/* Decorative gradient blob */}
                        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl" />

                        <div className="flex flex-row items-center justify-between pb-4">
                            <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{card.title}</h3>
                            <div className="p-2 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                                {card.icon}
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-white">{card.value}</div>
                            <p className="flex items-center gap-1 text-xs mt-2 font-medium text-neutral-500">
                                {card.trendUp ? (
                                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                                ) : (
                                    <Activity className="w-3 h-3 text-orange-500" />
                                )}
                                {card.trend}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={item} className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 p-6 shadow-sm overflow-hidden">
                    <h3 className="font-bold text-lg mb-6">Revenue Analytics</h3>
                    <div className="h-[250px] w-full bg-neutral-100/50 dark:bg-neutral-900/50 rounded-xl flex items-center justify-center border border-dashed border-neutral-200 dark:border-neutral-800">
                        <span className="text-neutral-400 font-medium text-sm">Interactive Chart Component</span>
                    </div>
                </div>

                <div className="col-span-3 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-neutral-800/50 p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                    US
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">New order placed</p>
                                    <p className="text-xs text-neutral-500">
                                        Amount: $450,000
                                    </p>
                                </div>
                                <div className="font-medium text-xs text-neutral-400">2m ago</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
