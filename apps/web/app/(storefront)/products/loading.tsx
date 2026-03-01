import { Skeleton } from "@/components/ui/loading-spinner";

export default function ProductsLoading() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-12">
                <Skeleton className="h-10 w-48 mb-4" />
                <Skeleton className="h-6 w-96" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-neutral-900 rounded-3xl p-4 border border-neutral-100 dark:border-neutral-800 shadow-sm">
                        <Skeleton className="w-full aspect-square rounded-2xl mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-4" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-10 w-24 rounded-xl" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
