"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/order";

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "COMPLETED" | "CANCELLED";

const STATUS_OPTIONS: { value: OrderStatus; label: string; color: string }[] = [
    { value: "PENDING", label: "Pendiente", color: "#D97706" },
    { value: "PAID", label: "Pagado", color: "#059669" },
    { value: "SHIPPED", label: "Enviado", color: "#2563EB" },
    { value: "COMPLETED", label: "Completado", color: "#7C3AED" },
    { value: "CANCELLED", label: "Cancelado", color: "#DC2626" },
];

interface Props {
    orderId: string;
    currentStatus: OrderStatus;
}

export function OrderStatusUpdater({ orderId, currentStatus }: Props) {
    const [status, setStatus] = useState<OrderStatus>(currentStatus);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const current = STATUS_OPTIONS.find(s => s.value === status)!;

    const handleChange = (newStatus: OrderStatus) => {
        if (newStatus === status) return;
        setError(null);
        setSuccess(false);
        startTransition(async () => {
            try {
                await updateOrderStatus(orderId, newStatus);
                setStatus(newStatus);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } catch {
                setError("Error al actualizar el estado.");
            }
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Estado de la orden
            </label>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {STATUS_OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        onClick={() => handleChange(opt.value)}
                        disabled={isPending}
                        style={{
                            padding: "0.4rem 0.9rem",
                            borderRadius: 6,
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: isPending ? "not-allowed" : "pointer",
                            border: `1.5px solid ${opt.value === status ? opt.color : "#E5EAF0"}`,
                            background: opt.value === status ? opt.color : "white",
                            color: opt.value === status ? "white" : "#6B7280",
                            opacity: isPending ? 0.6 : 1,
                            transition: "all 0.15s",
                        }}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {isPending && (
                <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>Actualizando...</p>
            )}
            {success && (
                <p style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600 }}>
                    ✓ Estado actualizado a <strong>{current.label}</strong>
                </p>
            )}
            {error && (
                <p style={{ fontSize: "0.8rem", color: "#DC2626" }}>{error}</p>
            )}
        </div>
    );
}
