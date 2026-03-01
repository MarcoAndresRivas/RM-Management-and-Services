import { prisma } from "@repo/db";
import { format } from "date-fns";
import { Users, ShoppingCart, DollarSign, Mail, Phone, Eye } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
    const tenant = await prisma.tenant.findFirst();

    const customers = await prisma.customer.findMany({
        where: tenant ? { tenantId: tenant.id } : undefined,
        include: {
            orders: {
                where: { status: 'PAID' },
                select: { totalAmount: true, createdAt: true, orderNumber: true, id: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    const topCustomers = customers
        .map(c => ({
            ...c,
            totalSpent: c.orders.reduce((s, o) => s + o.totalAmount, 0),
            orderCount: c.orders.length,
            lastOrder: c.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
        }))
        .sort((a, b) => b.totalSpent - a.totalSpent);

    const totalRevenue = topCustomers.reduce((s, c) => s + c.totalSpent, 0);
    const avgOrderValue = topCustomers.reduce((s, c) => s + c.orderCount, 0) > 0
        ? totalRevenue / topCustomers.reduce((s, c) => s + c.orderCount, 0)
        : 0;

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                        CRM · Clientes
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                        Gestión de clientes y su historial de compras.
                    </p>
                </div>
            </div>

            {/* Summary KPIs */}
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    {
                        label: "Total Clientes",
                        value: customers.length.toString(),
                        icon: Users,
                        color: "text-indigo-500",
                        bg: "bg-indigo-50 dark:bg-indigo-950/20"
                    },
                    {
                        label: "Clientes con Compras",
                        value: topCustomers.filter(c => c.orderCount > 0).length.toString(),
                        icon: ShoppingCart,
                        color: "text-emerald-500",
                        bg: "bg-emerald-50 dark:bg-emerald-950/20"
                    },
                    {
                        label: "Ticket Promedio",
                        value: new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(avgOrderValue),
                        icon: DollarSign,
                        color: "text-amber-500",
                        bg: "bg-amber-50 dark:bg-amber-950/20"
                    }
                ].map((kpi) => (
                    <div key={kpi.label} className={`rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 ${kpi.bg} p-6 flex items-center gap-4`}>
                        <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl shadow-sm">
                            <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{kpi.label}</p>
                            <p className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">{kpi.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Customers Table */}
            <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <h3 className="font-bold text-lg text-neutral-900 dark:text-white">Lista de Clientes</h3>
                    <span className="text-xs text-neutral-500 font-medium">{customers.length} registros</span>
                </div>

                {customers.length === 0 ? (
                    <div className="py-20 text-center">
                        <Users className="mx-auto h-12 w-12 text-neutral-300 mb-4" />
                        <p className="text-neutral-500 font-medium">No hay clientes registrados aún.</p>
                        <p className="text-neutral-400 text-sm mt-1">Los clientes aparecerán cuando realicen una compra.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-50 dark:bg-neutral-800/50">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Cliente</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Contacto</th>
                                    <th className="text-center px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Órdenes</th>
                                    <th className="text-right px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Total Gastado</th>
                                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Última Compra</th>
                                    <th className="text-center px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                {topCustomers.map((customer) => (
                                    <tr key={customer.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                                                    {customer.name?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-neutral-900 dark:text-white">{customer.name || "Sin nombre"}</p>
                                                    {customer.rut && (
                                                        <p className="text-xs text-neutral-400">RUT: {customer.rut}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                {customer.email && (
                                                    <a href={`mailto:${customer.email}`} className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-indigo-600 transition-colors">
                                                        <Mail className="h-3 w-3" /> {customer.email}
                                                    </a>
                                                )}
                                                {customer.phone && (
                                                    <a href={`tel:${customer.phone}`} className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-indigo-600 transition-colors">
                                                        <Phone className="h-3 w-3" /> {customer.phone}
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold ${customer.orderCount > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800'}`}>
                                                {customer.orderCount}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`font-bold ${customer.totalSpent > 0 ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'}`}>
                                                {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(customer.totalSpent)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500">
                                            {customer.lastOrder
                                                ? format(new Date(customer.lastOrder.createdAt), "dd MMM yyyy")
                                                : <span className="italic text-neutral-300">Sin compras</span>
                                            }
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {customer.lastOrder && (
                                                <Link
                                                    href={`/orders/${customer.lastOrder.id}`}
                                                    className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                                >
                                                    <Eye className="h-3 w-3" /> Ver
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
