import React from "react";
import { ArrowRight, SearchX } from "lucide-react";
import { prisma } from "@repo/db";
import { ProductCard } from "@/components/ui/product-card";
import { ProductFilters } from "@/components/storefront/ProductFilters";

export const dynamic = 'force-dynamic';

export default async function ProductsPage(props: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const searchParams = await props.searchParams;
    // Next.js 15+ needs to await searchParams
    const resolvedParams = await searchParams;

    // We only fetch products for the main tenant for Demo purposes
    const tenant = await prisma.tenant.findFirst();

    const q = resolvedParams?.q || "";
    const categoryId = resolvedParams?.category || "";

    // 1. Fetch Categories for Filters
    const categories = await prisma.category.findMany({
        where: tenant ? { tenantId: tenant.id } : undefined,
        orderBy: { name: "asc" }
    });

    // 2. Fetch Products with Filters
    const products = await prisma.product.findMany({
        where: {
            ...(tenant ? { tenantId: tenant.id } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(q ? {
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { description: { contains: q, mode: 'insensitive' } },
                ]
            } : {}),
        },
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div style={{ minHeight: "100vh", background: "#F8FAFC", paddingBottom: "6rem" }}>

            {/* Hero Section Institucional */}
            <section style={{
                background: "linear-gradient(135deg, #005FB8 0%, #004080 100%)",
                color: "white",
                padding: "5rem 1rem",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}>
                <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 10 }}>
                    <span style={{
                        display: "inline-block", background: "rgba(255,255,255,0.15)",
                        padding: "0.25rem 1rem", borderRadius: 999, fontSize: "0.85rem",
                        fontWeight: 600, letterSpacing: "0.05em", marginBottom: "1.5rem",
                    }}>
                        CATÁLOGO DE PRODUCTOS
                    </span>
                    <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                        Encuentra lo que necesitas
                    </h1>
                    <p style={{ fontSize: "1.1rem", color: "#D1E6F9", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
                        Explora nuestra amplia selección de productos y servicios integrados. Utiliza los filtros para encontrar exactamente lo que estás buscando.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>

                {/* Header & Filters */}
                <div style={{ marginBottom: "2rem" }}>
                    <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", marginBottom: "0.25rem" }}>
                        Cachureos y Tecnología
                    </h2>
                    <p style={{ color: "#6B7280", marginBottom: "1.5rem" }}>
                        Mostrando {products.length} {products.length === 1 ? "resultado" : "resultados"}.
                    </p>

                    <ProductFilters categories={categories} />
                </div>

                {/* Catalog Grid */}
                {products.length === 0 ? (
                    <div style={{
                        textAlign: "center", padding: "5rem 1rem", background: "white",
                        borderRadius: 16, border: "1px solid #E5EAF0",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"
                    }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF" }}>
                            <SearchX size={32} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: "0.25rem" }}>No se encontraron productos</h3>
                            <p style={{ color: "#6B7280" }}>
                                {q ? `No hay resultados para "${q}". ` : ""}
                                {categoryId ? "Intenta seleccionar una categoría distinta." : "Prueba con otros términos de búsqueda."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "2rem",
                    }}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
