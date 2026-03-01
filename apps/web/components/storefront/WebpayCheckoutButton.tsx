"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Link2 } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

export function WebpayCheckoutButton() {
    const { items } = useCartStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleWebpayCheckout = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch("/api/checkout/webpay/init", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderData: { items },
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar pago Webpay");
            }

            // Transbank Webpay Plus requires submitting a hidden form with the token_ws
            // to the returned URL to start the payment flow.
            const form = document.createElement("form");
            form.method = "POST";
            form.action = data.url;

            const tokenInput = document.createElement("input");
            tokenInput.type = "hidden";
            tokenInput.name = "token_ws";
            tokenInput.value = data.token;

            form.appendChild(tokenInput);
            document.body.appendChild(form);
            form.submit();

        } catch (err: any) {
            console.error("Webpay Checkout Error:", err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full mt-2">
            <button
                onClick={handleWebpayCheckout}
                disabled={isLoading || items.length === 0}
                className="w-full flex justify-between items-center rounded-full bg-[#E5105D] px-6 py-4 font-bold text-white hover:bg-[#C40E4F] active:scale-95 transition-all disabled:opacity-70 disabled:active:scale-100"
            >
                <div className="flex items-center gap-2">
                    <span className="font-extrabold tracking-tight">Pagar con Webpay</span>
                    <span className="text-xs bg-white text-[#E5105D] px-2 py-0.5 rounded-full font-bold">Plus</span>
                </div>
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5 opacity-70" />}
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <p className="text-[10px] text-center text-neutral-500 mt-1 uppercase tracking-wider font-semibold">
                * Ambiente de Pruebas (Integración)
            </p>
        </div>
    );
}
