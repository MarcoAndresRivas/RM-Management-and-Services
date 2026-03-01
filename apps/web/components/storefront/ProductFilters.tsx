"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useCallback, useTransition } from "react";

interface Category {
    id: string;
    name: string;
}

interface Props {
    categories: Category[];
}

export function ProductFilters({ categories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentQ = searchParams.get("q") ?? "";
    const currentCat = searchParams.get("category") ?? "";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        startTransition(() => {
            router.push(`/products?${createQueryString("q", val)}`);
        });
    };

    const handleCategory = (catId: string) => {
        startTransition(() => {
            router.push(`/products?${createQueryString("category", catId)}`);
        });
    };

    return (
        <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Search Bar */}
            <div style={{ position: "relative", maxWidth: 400 }}>
                <Search
                    size={18}
                    style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6B7280" }}
                />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    defaultValue={currentQ}
                    onChange={handleSearch}
                    style={{
                        width: "100%",
                        padding: "0.8rem 1rem 0.8rem 2.8rem",
                        borderRadius: 999,
                        border: "1px solid #E5EAF0",
                        fontSize: "0.95rem",
                        outline: "none",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        transition: "all 0.2s",
                        opacity: isPending ? 0.7 : 1,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#005FB8")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5EAF0")}
                />
            </div>

            {/* Category Pills */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6B7280", marginRight: "0.5rem" }}>
                    Categorías:
                </span>

                <button
                    onClick={() => handleCategory("")}
                    style={{
                        padding: "0.4rem 1rem",
                        borderRadius: 999,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        border: `1.5px solid ${!currentCat ? "#005FB8" : "#E5EAF0"}`,
                        background: !currentCat ? "#005FB8" : "white",
                        color: !currentCat ? "white" : "#4B5563",
                        transition: "all 0.15s",
                        opacity: isPending ? 0.7 : 1,
                    }}
                >
                    Todas
                </button>

                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategory(cat.id)}
                        style={{
                            padding: "0.4rem 1rem",
                            borderRadius: 999,
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            border: `1.5px solid ${currentCat === cat.id ? "#005FB8" : "#E5EAF0"}`,
                            background: currentCat === cat.id ? "#005FB8" : "white",
                            color: currentCat === cat.id ? "white" : "#4B5563",
                            transition: "all 0.15s",
                            opacity: isPending ? 0.7 : 1,
                        }}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
