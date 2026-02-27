import { prisma } from "@repo/db";
import { Eye, FileText, CheckCircle2, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    const session = await auth();
    const tenant = await prisma.tenant.findFirst();

    const orders = await prisma.order.findMany({
        where: tenant ? { tenantId: tenant.id } : undefined,
        include: {
            customer: true,
            dte: true,
            _count: {
                select: { items: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PAID':
            case 'COMPLETED':
            case 'SHIPPED':
                return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" />;
            case 'CANCELLED':
                return <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />;
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID':
            case 'COMPLETED':
            case 'SHIPPED':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
            default:
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
                    <p className="text-muted-foreground">
                        Manage customer purchases, payment statuses and generated receipts (DTE).
                    </p>
                </div>
            </div>

            <div className="rounded-md border bg-white dark:bg-black overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                        <tr>
                            <th className="px-6 py-4 font-medium text-neutral-500">Order ID</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Date</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Customer</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Total</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Status</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Receipt (SII)</th>
                            <th className="px-6 py-4 text-right font-medium text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-8 text-center text-neutral-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">
                                        #{order.orderNumber}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100">
                                        {order.customer?.name || "Guest Checkout"}
                                        <div className="text-xs text-neutral-500">{order.customer?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100 font-medium">
                                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(order.totalAmount)}
                                        <div className="text-xs text-neutral-500 font-normal">{order._count.items} items</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ${getStatusStyle(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {order.dte ? (
                                            <div className="flex flex-col">
                                                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                                    {order.dte.type === 'FACTURA_ELECTRONICA' ? 'Factura' : 'Boleta'}
                                                </span>
                                                <span className="text-xs text-neutral-500">Folio: {order.dte.folio}</span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-neutral-400 italic">Pending generation...</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            {order.dte?.pdfUrl && (
                                                <a href={order.dte.pdfUrl} target="_blank" rel="noreferrer" className="p-2 text-neutral-400 hover:text-indigo-600 transition-colors" title="View DTE">
                                                    <FileText className="h-4 w-4" />
                                                </a>
                                            )}
                                            <Link href={`/orders/${order.id}`} className="p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors" title="View Details">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
