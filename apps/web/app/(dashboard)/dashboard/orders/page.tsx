import { prisma } from "@repo/db";
import { getOrderStats } from "@/app/actions/order";
import { Eye, FileText, CheckCircle2, Clock, XCircle, TruckIcon, PackageCheck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, string> = {
    PENDING: "Pendiente",
    PAID: "Pagado",
    SHIPPED: "Enviado",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    PENDING: { bg: "#FEF3C7", text: "#92400E", border: "#F59E0B" },
    PAID: { bg: "#D1FAE5", text: "#065F46", border: "#10B981" },
    SHIPPED: { bg: "#DBEAFE", text: "#1E3A8A", border: "#3B82F6" },
    COMPLETED: { bg: "#EDE9FE", text: "#4C1D95", border: "#7C3AED" },
    CANCELLED: { bg: "#FEE2E2", text: "#7F1D1D", border: "#EF4444" },
};

function StatusBadge({ status }: { status: string }) {
    const c = (STATUS_COLORS[status] || STATUS_COLORS.PENDING) as { bg: string; text: string; border: string };
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: c.bg, color: c.text,
            border: `1px solid ${c.border}`,
            borderRadius: 999, padding: "0.2rem 0.7rem",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.03em",
        }}>
            {STATUS_LABELS[status] ?? status}
        </span>
    );
}

const clp = (n: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

export default async function OrdersPage(props: {
    searchParams: Promise<{ status?: string }>;
}) {
    const searchParams = await props.searchParams;
    const tenant = await prisma.tenant.findFirst();
    const stats = tenant ? await getOrderStats(tenant.id) : null;

    const statusFilter = searchParams?.status;
    const whereClause = {
        ...(tenant ? { tenantId: tenant.id } : {}),
        ...(statusFilter ? { status: statusFilter as any } : {}),
    };

    const orders = await prisma.order.findMany({
        where: whereClause,
        include: {
            customer: true,
            dte: true,
            _count: { select: { items: true } }
        },
        orderBy: { createdAt: "desc" },
    });

    const statCards = [
        { label: "Total órdenes", value: stats?.total ?? 0, icon: ShoppingBag, color: "#005FB8", bg: "#EBF4FD" },
        { label: "Ingresos (pagadas)", value: clp(stats?.revenue ?? 0), icon: CheckCircle2, color: "#059669", bg: "#D1FAE5", isAmount: true },
        { label: "Pendientes", value: stats?.pending ?? 0, icon: Clock, color: "#D97706", bg: "#FEF3C7" },
        { label: "Enviadas", value: stats?.shipped ?? 0, icon: TruckIcon, color: "#2563EB", bg: "#DBEAFE" },
        { label: "Completadas", value: stats?.completed ?? 0, icon: PackageCheck, color: "#7C3AED", bg: "#EDE9FE" },
        { label: "Canceladas", value: stats?.cancelled ?? 0, icon: XCircle, color: "#DC2626", bg: "#FEE2E2" },
    ];

    const filterTabs = [
        { label: "Todas", value: "" },
        { label: "Pendientes", value: "PENDING" },
        { label: "Pagadas", value: "PAID" },
        { label: "Enviadas", value: "SHIPPED" },
        { label: "Completadas", value: "COMPLETED" },
        { label: "Canceladas", value: "CANCELLED" },
    ];

    return (
        <div style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "1.75rem" }}>
                <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#111827", marginBottom: "0.25rem" }}>
                    Gestión de Órdenes
                </h1>
                <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>
                    Revisa, filtra y actualiza el estado de todas las órdenes del negocio.
                </p>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                    gap: "1rem",
                    marginBottom: "2rem",
                }}>
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div key={card.label} style={{
                                background: "white",
                                border: "1px solid #E5EAF0",
                                borderRadius: 10,
                                padding: "1.1rem 1.25rem",
                                display: "flex", flexDirection: "column", gap: "0.5rem",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                            }}>
                                <div style={{
                                    width: 34, height: 34, borderRadius: 8,
                                    background: card.bg,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: card.color,
                                }}>
                                    <Icon size={18} />
                                </div>
                                <div style={{ fontSize: card.isAmount ? "1rem" : "1.5rem", fontWeight: 800, color: "#111827", lineHeight: 1.1 }}>
                                    {card.value}
                                </div>
                                <div style={{ fontSize: "0.72rem", color: "#6B7280", fontWeight: 500 }}>{card.label}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Filter Tabs */}
            <div style={{
                display: "flex", gap: "0.4rem", flexWrap: "wrap",
                marginBottom: "1.25rem",
                borderBottom: "1px solid #E5EAF0",
                paddingBottom: "1rem",
            }}>
                {filterTabs.map(tab => {
                    const isActive = (statusFilter ?? "") === tab.value;
                    return (
                        <Link
                            key={tab.value}
                            href={tab.value ? `/dashboard/orders?status=${tab.value}` : "/dashboard/orders"}
                            style={{
                                padding: "0.4rem 1rem",
                                borderRadius: 6,
                                fontSize: "0.82rem",
                                fontWeight: 600,
                                textDecoration: "none",
                                background: isActive ? "#005FB8" : "white",
                                color: isActive ? "white" : "#6B7280",
                                border: `1.5px solid ${isActive ? "#005FB8" : "#E5EAF0"}`,
                                transition: "all 0.15s",
                            }}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>

            {/* Table */}
            <div style={{
                background: "white",
                border: "1px solid #E5EAF0",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                    <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E5EAF0" }}>
                            {["# Orden", "Fecha", "Cliente", "Items", "Total", "Estado", "DTE", ""].map(h => (
                                <th key={h} style={{
                                    padding: "0.85rem 1rem",
                                    textAlign: "left",
                                    fontWeight: 600,
                                    fontSize: "0.75rem",
                                    color: "#6B7280",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.04em",
                                    whiteSpace: "nowrap",
                                }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ padding: "3rem", textAlign: "center", color: "#9CA3AF", fontSize: "0.9rem" }}>
                                    {statusFilter
                                        ? `No hay órdenes con estado "${STATUS_LABELS[statusFilter]}".`
                                        : "No hay órdenes registradas aún."}
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, i) => (
                                <tr key={order.id} style={{
                                    borderBottom: i < orders.length - 1 ? "1px solid #F1F5F9" : "none",
                                    transition: "background 0.1s",
                                }}>
                                    <td style={{ padding: "0.9rem 1rem", fontWeight: 700, color: "#111827" }}>
                                        #{order.orderNumber}
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                                        {format(new Date(order.createdAt), "dd MMM yyyy", { locale: es })}
                                        <div style={{ fontSize: "0.72rem", marginTop: 1 }}>
                                            {format(new Date(order.createdAt), "HH:mm")}
                                        </div>
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem", maxWidth: 180 }}>
                                        <div style={{ fontWeight: 600, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {order.customer?.name ?? "Cliente invitado"}
                                        </div>
                                        <div style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                            {order.customer?.email ?? "—"}
                                        </div>
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem", color: "#6B7280", textAlign: "center" }}>
                                        {order._count.items}
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem", fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
                                        {clp(order.totalAmount)}
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem" }}>
                                        <StatusBadge status={order.status} />
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem" }}>
                                        {order.dte ? (
                                            <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>
                                                {order.dte.type === "FACTURA_ELECTRONICA" ? "Factura" : "Boleta"}
                                                {order.dte.folio ? ` #${order.dte.folio}` : ""}
                                            </span>
                                        ) : (
                                            <span style={{ fontSize: "0.75rem", color: "#9CA3AF", fontStyle: "italic" }}>Pendiente</span>
                                        )}
                                    </td>
                                    <td style={{ padding: "0.9rem 1rem", textAlign: "right" }}>
                                        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                                            {order.dte?.pdfUrl && (
                                                <a
                                                    href={order.dte.pdfUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Ver DTE PDF"
                                                    style={{ color: "#6B7280", lineHeight: 1 }}
                                                >
                                                    <FileText size={16} />
                                                </a>
                                            )}
                                            <Link
                                                href={`/dashboard/orders/${order.id}`}
                                                title="Ver detalle"
                                                style={{ color: "#005FB8", lineHeight: 1 }}
                                            >
                                                <Eye size={16} />
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
