const fetch = require('node-fetch'); // If it exists, or just use global fetch in Node 18+

async function testCheckout() {
    console.log("1. Testing /api/checkout...");
    const checkoutRes = await fetch("http://localhost:3001/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: [
                { id: "prod_1", name: "Premium Widget", price: 15000, quantity: 2 }
            ],
            documentType: "BOLETA",
            paymentMethod: "MERCADOPAGO"
        })
    });

    const checkoutData = await checkoutRes.json();
    console.log("Checkout Response:", checkoutData);

    if (checkoutData.error) {
        console.error("Failed checkout:", checkoutData.error);
        return;
    }

    // We don't have the orderId easily accessible from the MP URL directly in this test,
    // but if we look at the DB we could get the latest order.
    // Instead, let's just test the /api/dte endpoint separately with a dummy order if needed,
    // OR we can fetch the latest order using Prisma. Let's just create a dummy one for now,
    // or pass a fake ID that fails gracefully if Prisma check is strict.

    console.log("\n2. Testing /api/dte with a generic payload...");
    const dteRes = await fetch("http://localhost:3001/api/dte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId: "invalid_id_for_now_to_check_validation",
            documentType: "BOLETA"
        })
    });

    const dteData = await dteRes.json();
    console.log("DTE Response:", dteData);
}

testCheckout().catch(console.error);
