import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const users = await prisma.user.findMany({
        select: { email: true, role: true }
    })
    console.log("Usuarios en la base de datos:")
    console.log(users)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
