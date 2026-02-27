const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding test data...");
    let tenant = await prisma.tenant.findFirst();
    if (!tenant) {
        tenant = await prisma.tenant.create({ data: { name: "Test Tenant", slug: "test" } });
    }

    const product = await prisma.product.create({
        data: {
            name: "Test E-commerce Product",
            price: 15000,
            stock: 10,
            tenantId: tenant.id
        }
    });

    console.log(`Created product with ID: ${product.id}`);

    // Test the endpoint using fetch since node 18 has fetch global
    console.log("Testing POST /api/checkout...");
    const checkoutRes = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: [
                { id: product.id, name: product.name, price: product.price, quantity: 1 }
            ],
            documentType: "BOLETA",
            paymentMethod: "MERCADOPAGO"
        })
    });

    const checkoutData = await checkoutRes.json();
    console.log("Checkout Response:", checkoutData);

    // Take the orderId or simulate DTE
    // For DTE, let's just grab the last order
    const order = await prisma.order.findFirst({
        orderBy: { createdAt: 'desc' }
    });

    if (order) {
        console.log(`\nTesting POST /api/dte for Order ${order.id}...`);
        const dteRes = await fetch("http://localhost:3000/api/dte", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                orderId: order.id,
                documentType: "BOLETA"
            })
        });
        const dteData = await dteRes.json();
        console.log("DTE Response:", dteData);
    }
}

main().catch(console.error).finally(() => prisma.$disconnect());
