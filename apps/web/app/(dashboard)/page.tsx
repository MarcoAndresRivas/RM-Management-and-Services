import { prisma } from "@repo/db";
import { DashboardClient } from "./dashboard-client";
import { DashboardCharts } from "./dashboard-charts";

export const dynamic = 'force-dynamic';

// Months in Spanish for labeling
const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export default async function DashboardPage() {
    const tenant = await prisma.tenant.findFirst();

    // Fetch KPI metrics
    const [usersCount, productsCount, ordersCount, paidOrders] = await Promise.all([
        prisma.user.count({ where: tenant ? { tenantId: tenant.id } : undefined }),
        prisma.product.count({ where: tenant ? { tenantId: tenant.id } : undefined }),
        prisma.order.count({ where: tenant ? { tenantId: tenant.id } : undefined }),
        prisma.order.findMany({
            where: { status: 'PAID', ...(tenant ? { tenantId: tenant.id } : {}) },
            select: { totalAmount: true, createdAt: true }
        })
    ]);

    const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Build last 6 months of sales data
    const now = new Date();
    const monthlySales = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        const monthLabel = MONTH_NAMES[d.getMonth()];
        const monthOrders = paidOrders.filter(o => {
            const od = new Date(o.createdAt);
            return od.getMonth() === d.getMonth() && od.getFullYear() === d.getFullYear();
        });
        return {
            month: monthLabel,
            total: monthOrders.reduce((s, o) => s + o.totalAmount, 0),
            orders: monthOrders.length
        };
    });

    // Category distribution from order items
    const orderItems = await prisma.orderItem.findMany({
        where: {
            order: { status: 'PAID', ...(tenant ? { tenantId: tenant.id } : {}) }
        },
        include: { product: { include: { category: true } } }
    });

    const categoryMap: Record<string, number> = {};
    for (const item of orderItems) {
        const cat = item.product?.category?.name || "Sin categoría";
        categoryMap[cat] = (categoryMap[cat] || 0) + (item.price * item.quantity);
    }
    const categorySales = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 relative">
            {/* Background ambient */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent pointer-events-none -z-10" />

            <DashboardClient
                revenue={totalRevenue}
                users={usersCount}
                products={productsCount}
                ordersCount={ordersCount}
            />

            <DashboardCharts
                monthlySales={monthlySales}
                categorySales={categorySales}
            />
        </div>
    );
}
