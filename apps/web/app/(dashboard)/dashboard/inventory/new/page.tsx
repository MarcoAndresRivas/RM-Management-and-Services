import { createProduct } from "@/app/actions/product";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 max-w-4xl mx-auto w-full">
            <div className="flex items-center space-x-4 mb-8">
                <Link href="/inventory" className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
                    <p className="text-muted-foreground mt-1">
                        Create a new product to display in the main catalog.
                    </p>
                </div>
            </div>

            <form action={createProduct} className="space-y-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-2xl p-6 sm:p-8">

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-neutral-100 dark:border-neutral-800 pb-2">Basic Information</h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none">Product Name *</label>
                            <input
                                id="name"
                                name="name"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Wireless Noise-cancelling Headphones"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium leading-none">Category</label>
                            <input
                                id="category"
                                name="category"
                                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Audio Premium"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium leading-none">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Detail the features of your product..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b border-neutral-100 dark:border-neutral-800 pb-2">Pricing & Inventory</h3>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-medium leading-none">Price (CLP) *</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-neutral-500 text-sm">$</span>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 pl-7 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="15000"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="stock" className="text-sm font-medium leading-none">Available Stock *</label>
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="10"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 h-11 px-8 py-2"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Product
                    </button>
                </div>

            </form>
        </div>
    );
}
