import { cn } from "@/lib/utils";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({ className, size = "md", ...props }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
    };

    return (
        <div
            className={cn(
                "animate-spin rounded-full border-neutral-200 border-t-neutral-800 dark:border-neutral-800 dark:border-t-neutral-200",
                sizeClasses[size],
                className
            )}
            {...props}
        />
    );
}

export function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800", className)}
            {...props}
        />
    );
}
