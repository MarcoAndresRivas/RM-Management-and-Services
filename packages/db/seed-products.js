const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Seeding premium products...");

    let tenant = await prisma.tenant.findFirst();
    if (!tenant) {
        tenant = await prisma.tenant.create({ data: { name: "Default Holding", slug: "default" } });
    }

    // Categories
    const catAudio = await prisma.category.create({ data: { name: "Audio Premium", tenantId: tenant.id } });
    const catAccessory = await prisma.category.create({ data: { name: "Accesorios", tenantId: tenant.id } });
    const catTech = await prisma.category.create({ data: { name: "Tecnología", tenantId: tenant.id } });

    const products = [
        {
            name: "Auriculares Noise-Cancelling Pro",
            description: "Experimenta la máxima fidelidad de sonido con cancelación activa de ruido.",
            price: 199990,
            stock: 45,
            categoryId: catAudio.id,
            tenantId: tenant.id,
            // For images we will just rely on the fallback from the UI or add a field if schema supports it
            // Oh wait, `Product` schema doesn't have an `image` field currently. We rely on fallback in UI.
        },
        {
            name: "Teclado Mecánico Minimalista",
            description: "Switches táctiles silenciosos envueltos en un chasis de aluminio aeroespacial.",
            price: 125990,
            stock: 12,
            categoryId: catTech.id,
            tenantId: tenant.id,
        },
        {
            name: "Billetera Inteligente MagSafe",
            description: "Cuero vegano premium con bloqueo RFID y soporte magnético ultrafuerte.",
            price: 34990,
            stock: 3, // low stock to trigger UI badge
            categoryId: catAccessory.id,
            tenantId: tenant.id,
        },
        {
            name: "Monitor Ultrawide 34\" Curvo",
            description: "Sumérgete en el trabajo y juego con colores calibrados de fábrica e inmersión total.",
            price: 499990,
            stock: 0, // out of stock
            categoryId: catTech.id,
            tenantId: tenant.id,
        },
    ];

    for (const p of products) {
        await prisma.product.create({ data: p });
    }

    console.log("Seeding complete!");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
