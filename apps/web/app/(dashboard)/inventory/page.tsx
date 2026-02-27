import { prisma } from "@repo/db";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { auth } from "@/auth";

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
    const session = await auth();
    // In a real multi-tenant app, filter by tenantId from session
    // For demo, we get the first tenant.
    const tenant = await prisma.tenant.findFirst();

    const products = await prisma.product.findMany({
        where: tenant ? { tenantId: tenant.id } : undefined,
        include: {
            category: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
                    <p className="text-muted-foreground">
                        Manage your products, descriptions, and stock levels.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link
                        href="/inventory/new"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </div>
            </div>

            <div className="rounded-md border bg-white dark:bg-black overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-neutral-50 dark:bg-neutral-900 border-b">
                        <tr>
                            <th className="px-6 py-4 font-medium text-neutral-500">Product Name</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Category</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Price</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Stock</th>
                            <th className="px-6 py-4 font-medium text-neutral-500">Added</th>
                            <th className="px-6 py-4 text-right font-medium text-neutral-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                                    No products found. Start by adding a new one.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-100">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {product.category?.name || "Uncategorized"}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-900 dark:text-neutral-100 font-medium">
                                        {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(product.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'}`}>
                                            {product.stock} in stock
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {format(new Date(product.createdAt), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link href={`/inventory/${product.id}/edit`} className="p-2 text-neutral-400 hover:text-blue-600 transition-colors">
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                            <button className="p-2 text-neutral-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
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
