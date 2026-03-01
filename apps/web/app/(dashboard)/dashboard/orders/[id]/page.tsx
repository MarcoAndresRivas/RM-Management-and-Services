import { prisma } from "@repo/db";
import { ArrowLeft, Package, CreditCard, User, FileText, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { OrderStatusUpdater } from "@/components/orders/OrderStatusUpdater";

export const dynamic = 'force-dynamic';

const clp = (n: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

const PAYMENT_LABELS: Record<string, string> = {
    MERCADOPAGO: "MercadoPago",
    WEBPAY_PLUS: "Webpay Plus",
    CRYPTO: "Crypto",
    MACH: "MACH",
    TENPO: "Tenpo",
    OTHER: "Otro",
};

const DTE_TYPE_LABELS: Record<string, string> = {
    BOLETA_ELECTRONICA: "Boleta Electrónica (Cód. 39)",
    FACTURA_ELECTRONICA: "Factura Electrónica (Cód. 33)",
    GUIA_DESPACHO: "Guía de Despacho (Cód. 52)",
    NOTA_CREDITO: "Nota de Crédito (Cód. 61)",
    NOTA_DEBITO: "Nota de Débito (Cód. 56)",
};

const DTE_STATUS_LABELS: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pendiente", color: "#D97706" },
    GENERATED: { label: "Generado", color: "#2563EB" },
    ACCEPTED_SII: { label: "Aceptado por SII", color: "#059669" },
    REJECTED_SII: { label: "Rechazado por SII", color: "#DC2626" },
    ACCEPTED_CUSTOMER: { label: "Aceptado por cliente", color: "#7C3AED" },
    REJECTED_CUSTOMER: { label: "Rechazado por cliente", color: "#DC2626" },
};

function SectionCard({ title, icon: Icon, children }: {
    title: string;
    icon: React.ComponentType<{ size?: number }>;
    children: React.ReactNode;
}) {
    return (
        <div style={{
            background: "white",
            border: "1px solid #E5EAF0",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
            <div style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #F1F5F9",
                display: "flex", alignItems: "center", gap: "0.6rem",
                background: "#F8FAFC",
            }}>
                <Icon size={16} />
                <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#374151", margin: 0 }}>{title}</h3>
            </div>
            <div style={{ padding: "1.25rem" }}>{children}</div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", padding: "0.4rem 0", borderBottom: "1px solid #F9FAFB" }}>
            <span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500, flexShrink: 0 }}>{label}</span>
            <span style={{ fontSize: "0.8rem", color: "#111827", fontWeight: 600, textAlign: "right" }}>{value ?? "—"}</span>
        </div>
    );
}

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    await auth();
    const resolvedParams = await params;

    const tenant = await prisma.tenant.findFirst();
    if (!tenant) return notFound();

    const order = await prisma.order.findUnique({
        where: { id: resolvedParams.id, tenantId: tenant.id },
        include: {
            customer: true,
            dte: true,
            items: { include: { product: true } }
        }
    });
    if (!order) return notFound();

    const subtotal = order.items.reduce((acc, i) => acc + i.totalPrice, 0);
    const iva = Math.round(subtotal * 0.19);

    return (
        <div style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem" }}>
                <Link href="/dashboard/orders" style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 8,
                    background: "white", border: "1px solid #E5EAF0",
                    color: "#374151", textDecoration: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                }}>
                    <ArrowLeft size={16} />
                </Link>
                <div>
                    <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", margin: 0 }}>
                        Orden #{order.orderNumber}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                        <Calendar size={12} style={{ color: "#9CA3AF" }} />
                        <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>
                            {format(new Date(order.createdAt), "EEEE d 'de' MMMM yyyy 'a las' HH:mm", { locale: es })}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem", alignItems: "start" }}>

                {/* LEFT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                    {/* Products */}
                    <SectionCard title="Productos de la orden" icon={Package}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {order.items.map(item => (
                                <div key={item.id} style={{
                                    display: "flex", alignItems: "center", gap: "1rem",
                                    padding: "0.75rem",
                                    border: "1px solid #F1F5F9", borderRadius: 8,
                                }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 8,
                                        background: "#F8FAFC", display: "flex",
                                        alignItems: "center", justifyContent: "center",
                                        border: "1px solid #E5EAF0", flexShrink: 0,
                                    }}>
                                        <Package size={20} style={{ color: "#9CA3AF" }} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827" }}>
                                            {item.product?.name ?? "Producto no encontrado"}
                                        </div>
                                        <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                                            SKU: {item.product?.sku ?? "—"} · Cant: {item.quantity}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>
                                            {clp(item.totalPrice)}
                                        </div>
                                        <div style={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                                            {clp(item.unitPrice)} c/u
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #F1F5F9" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#6B7280", marginBottom: "0.4rem" }}>
                                <span>Subtotal (neto)</span>
                                <span>{clp(subtotal - iva)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#6B7280", marginBottom: "0.4rem" }}>
                                <span>IVA (19%)</span>
                                <span>{clp(iva)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: 800, color: "#111827", marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "2px solid #E5EAF0" }}>
                                <span>Total</span>
                                <span>{clp(order.totalAmount)}</span>
                            </div>
                        </div>
                    </SectionCard>

                    {/* Payment info */}
                    <SectionCard title="Información de pago" icon={CreditCard}>
                        <InfoRow label="Método de pago" value={PAYMENT_LABELS[order.paymentMethod ?? ""] ?? "No especificado"} />
                        <InfoRow label="ID de transacción" value={order.paymentId ?? "—"} />
                        <InfoRow label="Estado de pago" value={order.paymentStatus ?? "—"} />
                    </SectionCard>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                    {/* Status updater */}
                    <div style={{
                        background: "white",
                        border: "1px solid #E5EAF0",
                        borderRadius: 12,
                        padding: "1.25rem",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}>
                        <OrderStatusUpdater
                            orderId={order.id}
                            currentStatus={order.status as any}
                        />
                    </div>

                    {/* Customer */}
                    <SectionCard title="Cliente" icon={User}>
                        {order.customer ? (
                            <>
                                <InfoRow label="Nombre" value={order.customer.name} />
                                <InfoRow label="Email" value={order.customer.email} />
                                <InfoRow label="Teléfono" value={order.customer.phone} />
                                <InfoRow label="RUT" value={order.customer.rut} />
                                <InfoRow label="Dirección" value={order.customer.address} />
                            </>
                        ) : (
                            <p style={{ fontSize: "0.82rem", color: "#9CA3AF", fontStyle: "italic" }}>
                                Compra como invitado — sin cuenta asociada.
                            </p>
                        )}
                    </SectionCard>

                    {/* DTE */}
                    <SectionCard title="Documento Tributario (DTE)" icon={FileText}>
                        {order.dte ? (
                            <>
                                <InfoRow label="Tipo" value={DTE_TYPE_LABELS[order.dte.type] ?? order.dte.type} />
                                <InfoRow label="Folio" value={order.dte.folio} />
                                <InfoRow
                                    label="Estado SII"
                                    value={
                                        <span style={{ color: DTE_STATUS_LABELS[order.dte.status]?.color ?? "#6B7280", fontWeight: 700 }}>
                                            {DTE_STATUS_LABELS[order.dte.status]?.label ?? order.dte.status}
                                        </span>
                                    }
                                />
                                {order.dte.issuedAt && (
                                    <InfoRow label="Emitido" value={format(new Date(order.dte.issuedAt), "dd/MM/yyyy HH:mm")} />
                                )}
                                {order.dte.pdfUrl && (
                                    <a
                                        href={order.dte.pdfUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            marginTop: "0.75rem",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "0.4rem",
                                            background: "#EBF4FD",
                                            color: "#005FB8",
                                            borderRadius: 8,
                                            padding: "0.6rem",
                                            fontSize: "0.82rem",
                                            fontWeight: 600,
                                            textDecoration: "none",
                                        }}
                                    >
                                        <ExternalLink size={14} />
                                        Ver PDF del DTE
                                    </a>
                                )}
                            </>
                        ) : (
                            <div style={{ textAlign: "center", padding: "0.5rem" }}>
                                <p style={{ fontSize: "0.82rem", color: "#9CA3AF", fontStyle: "italic" }}>
                                    Sin DTE generado aún.
                                </p>
                                <p style={{ fontSize: "0.75rem", color: "#C4B5FD", marginTop: "0.4rem" }}>
                                    Se emitirá cuando la empresa esté habilitada ante el SII.
                                </p>
                            </div>
                        )}
                    </SectionCard>
                </div>
            </div>
        </div>
    );
}
