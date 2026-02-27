import { prisma } from "@repo/db";
import { ArrowLeft, ExternalLink, Package, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
    const session = await auth();
    const tenant = await prisma.tenant.findFirst();

    if (!tenant) {
        return notFound();
    }

    const order = await prisma.order.findUnique({
        where: { id: params.id, tenantId: tenant.id },
        include: {
            customer: true,
            dte: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    });

    if (!order) {
        return notFound();
    }

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 max-w-5xl mx-auto w-full">
            <div className="flex items-center space-x-4 mb-8">
                <Link href="/orders" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Order #{order.orderNumber}</h2>
                    <p className="text-muted-foreground mt-1">
                        Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy - HH:mm')}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm overflow-hidden">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5" />
                            Items Purchased
                        </h3>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                                    <div className="h-16 w-16 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex-shrink-0 flex items-center justify-center">
                                        <Package className="h-8 w-8 text-neutral-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate">{item.product?.name || 'Unknown Product'}</h4>
                                        <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold">{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(item.price)}</p>
                                        <p className="text-xs text-neutral-500">Total: {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(item.price * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Shipping Details
                        </h3>
                        <p className="text-sm text-neutral-500 italic">No shipping details provided for this simulated order.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Summary</h3>

                        <div className="space-y-3 text-sm border-b border-neutral-100 dark:border-neutral-800 pb-4 mb-4">
                            <div className="flex justify-between text-neutral-500">
                                <span>Subtotal</span>
                                <span className="text-neutral-900 dark:text-neutral-100">
                                    {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(order.totalAmount)}
                                </span>
                            </div>
                            <div className="flex justify-between text-neutral-500">
                                <span>I.V.A (19%)</span>
                                <span className="text-neutral-900 dark:text-neutral-100">
                                    Included
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(order.totalAmount)}</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4">Customer info</h3>
                        {order.customer ? (
                            <div className="space-y-2 text-sm">
                                <p><span className="font-semibold text-neutral-600 dark:text-neutral-400">Name:</span> {order.customer.name}</p>
                                <p><span className="font-semibold text-neutral-600 dark:text-neutral-400">Email:</span> {order.customer.email}</p>
                                <p><span className="font-semibold text-neutral-600 dark:text-neutral-400">Phone:</span> {order.customer.phone || 'N/A'}</p>
                                <p><span className="font-semibold text-neutral-600 dark:text-neutral-400">RUT:</span> {order.customer.documentId || 'N/A'}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500 italic">Guest Checkout.</p>
                        )}
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <Search className="w-5 h-5 text-indigo-500" />
                            Tax Document (DTE)
                        </h3>
                        {order.dte ? (
                            <div className="space-y-2 text-sm bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <p><strong className="text-neutral-600 dark:text-neutral-400">Status:</strong> EMITTED (SII)</p>
                                <p><strong className="text-neutral-600 dark:text-neutral-400">Type:</strong> {order.dte.type}</p>
                                <p><strong className="text-neutral-600 dark:text-neutral-400">Folio:</strong> {order.dte.folio}</p>
                                {order.dte.pdfUrl && (
                                    <a href={order.dte.pdfUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors font-semibold">
                                        View PDF Receipt <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        ) : (
                            <p className="text-sm text-neutral-500 bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 italic text-center">
                                Pending generation. DTE will be sent to the SII once payment is confirmed.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
