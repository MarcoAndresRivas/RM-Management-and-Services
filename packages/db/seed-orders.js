const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding customers, orders, and DTEs...");

    let tenant = await prisma.tenant.findFirst();
    if (!tenant) {
        tenant = await prisma.tenant.create({ data: { name: "Default Holding", slug: "default" } });
    }

    // Ensure we have some products
    const products = await prisma.product.findMany({ where: { tenantId: tenant.id } });
    if (products.length === 0) {
        console.error("No products found! Run seed-products.js first.");
        return;
    }

    // 1. Create Customers
    const customers = [
        { name: "Juan Pérez", email: "juan.perez@example.com", phone: "+56912345678", rut: "12345678-9", address: "Av. Providencia 1234, Santiago", tenantId: tenant.id },
        { name: "María González", email: "maria.g@example.com", phone: "+56987654321", rut: "9876543-2", address: "Las Condes 876, Santiago", tenantId: tenant.id },
        { name: "Roberto Sánchez", email: "roberto.sanchez@empresa.cl", phone: "+5622334455", rut: "76543210-K", address: "Ciudad Empresarial, Huechuraba", tenantId: tenant.id },
    ];

    const createdCustomers = [];
    for (const c of customers) {
        createdCustomers.push(
            await prisma.customer.upsert({
                where: { rut: c.rut },
                update: {},
                create: c,
            })
        );
    }
    console.log(`Created/found ${createdCustomers.length} customers.`);

    // Helper to get random product
    const getRandomProduct = () => products[Math.floor(Math.random() * products.length)];

    // 2. Create Orders
    const ordersData = [
        {
            customerId: createdCustomers[0].id,
            status: "COMPLETED",
            paymentMethod: "MERCADOPAGO",
            paymentId: "mp_123456789",
            paymentStatus: "approved",
            items: [
                { product: getRandomProduct(), quantity: 1 },
                { product: getRandomProduct(), quantity: 2 },
            ],
            dte: { type: "BOLETA_ELECTRONICA", status: "ACCEPTED_SII", folio: 1001 }
        },
        {
            customerId: createdCustomers[1].id,
            status: "SHIPPED",
            paymentMethod: "WEBPAY_PLUS",
            paymentId: "wp_987654321",
            paymentStatus: "AUTHORIZED",
            items: [
                { product: getRandomProduct(), quantity: 1 },
            ],
            dte: { type: "BOLETA_ELECTRONICA", status: "GENERATED", folio: 1002 }
        },
        {
            customerId: createdCustomers[2].id,
            status: "PAID",
            paymentMethod: "MERCADOPAGO",
            paymentId: "mp_555555555",
            paymentStatus: "approved",
            items: [
                { product: getRandomProduct(), quantity: 5 },
                { product: getRandomProduct(), quantity: 1 },
            ],
            dte: { type: "FACTURA_ELECTRONICA", status: "PENDING", folio: null } // Factura for empresa
        },
        {
            customerId: null, // Guest checkout
            status: "PENDING",
            paymentMethod: null,
            paymentId: null,
            paymentStatus: null,
            items: [
                { product: getRandomProduct(), quantity: 1 },
            ],
            dte: null
        },
        {
            customerId: createdCustomers[0].id,
            status: "CANCELLED",
            paymentMethod: "MACH",
            paymentId: "mach_rejected_99",
            paymentStatus: "rejected",
            items: [
                { product: getRandomProduct(), quantity: 1 },
            ],
            dte: null
        }
    ];

    for (const od of ordersData) {
        let totalAmount = 0;
        const orderItemsParams = od.items.map(i => {
            const totalPrice = i.product.price * i.quantity;
            totalAmount += totalPrice;
            return {
                productId: i.product.id,
                quantity: i.quantity,
                unitPrice: i.product.price,
                totalPrice: totalPrice,
            };
        });

        // Add some time spread to dates
        const daysAgo = Math.floor(Math.random() * 14);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - daysAgo);

        const order = await prisma.order.create({
            data: {
                tenantId: tenant.id,
                customerId: od.customerId,
                status: od.status,
                paymentMethod: od.paymentMethod,
                paymentId: od.paymentId,
                paymentStatus: od.paymentStatus,
                totalAmount,
                createdAt,
                items: {
                    create: orderItemsParams
                }
            }
        });

        if (od.dte) {
            await prisma.documentDTE.create({
                data: {
                    tenantId: tenant.id,
                    orderId: order.id,
                    type: od.dte.type,
                    status: od.dte.status,
                    folio: od.dte.folio,
                    issuedAt: od.dte.status !== "PENDING" ? createdAt : null,
                    pdfUrl: od.dte.status === "ACCEPTED_SII" ? "https://www.sii.cl/factura_electronica/factura_electronica.pdf" : null
                }
            });
        }
    }

    console.log(`Created ${ordersData.length} orders with DTE simulate data.`);
    console.log("Seeding complete!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
