const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding Admin User...");

    let tenant = await prisma.tenant.findFirst();
    if (!tenant) {
        tenant = await prisma.tenant.create({ data: { name: "Default Holding", slug: "default" } });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@rm-management.com' },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            tenantId: tenant.id
        },
        create: {
            email: 'admin@rm-management.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            tenantId: tenant.id
        },
    });

    console.log(`Admin created/updated: ${admin.email} (Password: admin123)`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
