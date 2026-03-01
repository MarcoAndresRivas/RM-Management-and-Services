/**
 * Simple email utility for transactional notifications.
 * In a real production environment, integrate with Resend, SendGrid, or AWS SES.
 */

export async function sendEmail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    // For now, we simulate the email sending by logging to the console.
    // To enable real emails, follow the Resend integration:
    // 1. npm install resend
    // 2. Add RESEND_API_KEY to .env

    console.log("--- SIMULATED EMAIL SENT ---");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("Content:");
    console.log(html);
    console.log("----------------------------");

    return { success: true, messageId: "sim_" + Math.random().toString(36).substring(7) };
}

/**
 * Sends a confirmation email for a specific order.
 */
export async function sendOrderConfirmationEmail(orderId: string, customerEmail: string, totalAmount: number) {
    const formattedAmount = new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
    }).format(totalAmount);

    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px;">¡Gracias por tu compra!</h1>
            <p>Hola,</p>
            <p>Hemos recibido tu pedido <strong>#${orderId.substring(0, 8).toUpperCase()}</strong> con éxito.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #666;">Total Pagado:</p>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #000;">${formattedAmount}</p>
            </div>

            <p>Tu boleta o factura electrónica ha sido generada y procesada. Pronto recibirás el detalle logístico para tu entrega.</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            
            <p style="font-size: 12px; color: #999;">
                RM Management & Services - Holding Empresarial Chile<br />
                Este es un correo automático, por favor no respondas directamente.
            </p>
        </div>
    `;

    return sendEmail({
        to: customerEmail,
        subject: `Confirmación de Pedido #${orderId.substring(0, 8).toUpperCase()} - RM Holding`,
        html,
    });
}
