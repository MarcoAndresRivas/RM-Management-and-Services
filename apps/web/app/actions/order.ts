"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    const session = await auth();

    if (!session?.user) {
        throw new Error("No autenticado.");
    }

    const tenant = await prisma.tenant.findFirst();
    if (!tenant) throw new Error("Tenant no encontrado.");

    await prisma.order.update({
        where: {
            id: orderId,
            tenantId: tenant.id,
        },
        data: { status },
    });

    revalidatePath("/dashboard/orders");
    revalidatePath(`/dashboard/orders/${orderId}`);
}

export async function getOrderStats(tenantId: string) {
    const [total, pending, paid, shipped, completed, cancelled, revenue] = await Promise.all([
        prisma.order.count({ where: { tenantId } }),
        prisma.order.count({ where: { tenantId, status: "PENDING" } }),
        prisma.order.count({ where: { tenantId, status: "PAID" } }),
        prisma.order.count({ where: { tenantId, status: "SHIPPED" } }),
        prisma.order.count({ where: { tenantId, status: "COMPLETED" } }),
        prisma.order.count({ where: { tenantId, status: "CANCELLED" } }),
        prisma.order.aggregate({
            where: { tenantId, status: { in: ["PAID", "SHIPPED", "COMPLETED"] } },
            _sum: { totalAmount: true },
        }),
    ]);

    return {
        total,
        pending,
        paid,
        shipped,
        completed,
        cancelled,
        revenue: revenue._sum.totalAmount ?? 0,
    };
}
