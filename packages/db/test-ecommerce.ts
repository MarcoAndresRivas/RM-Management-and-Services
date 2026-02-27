import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Iniciando prueba de inserción de datos E-Commerce y SII...')

    // 1. Crear o encontrar un Tenant de prueba
    let tenant = await prisma.tenant.findFirst({ where: { slug: 'test-ecommerce' } })
    if (!tenant) {
        tenant = await prisma.tenant.create({
            data: {
                name: 'Tech Store Chile',
                slug: 'test-ecommerce',
                rut: '76.123.456-7',
                razonSocial: 'Tech Store SpA',
                giro: 'Venta de equipos electrónicos',
                direccionTributaria: 'Av. Providencia 1234, Santiago',
            },
        })
        console.log(`✅ Tenant creado: ${tenant.name}`)
    } else {
        console.log(`✅ Tenant encontrado: ${tenant.name}`)
    }

    // 2. Crear un Cliente de prueba
    let customer = await prisma.customer.findFirst({ where: { email: 'juan@example.cl' } })
    if (!customer) {
        customer = await prisma.customer.create({
            data: {
                name: 'Juan Pérez',
                email: 'juan@example.cl',
                phone: '+56912345678',
                tenantId: tenant.id,
            },
        })
        console.log(`✅ Cliente creado: ${customer.name}`)
    } else {
        console.log(`✅ Cliente encontrado: ${customer.name}`)
    }

    // 3. Crear Productos de prueba
    const productA = await prisma.product.create({
        data: {
            name: 'Teclado Mecánico',
            price: 65990,
            stock: 10,
            tenantId: tenant.id,
        }
    })
    const productB = await prisma.product.create({
        data: {
            name: 'Mouse Inalámbrico',
            price: 25000,
            stock: 20,
            tenantId: tenant.id,
        }
    })
    console.log(`✅ Productos creados: ${productA.name}, ${productB.name}`)

    // 4. Emular el proceso de Checkout (Crear Orden y DTE)
    console.log('\nSimulando Checkout de MercadoPago...')

    const order = await prisma.order.create({
        data: {
            tenantId: tenant.id,
            customerId: customer.id,
            status: 'PAID',
            paymentMethod: 'MERCADOPAGO',
            paymentId: '1234567890',
            totalAmount: productA.price + productB.price,
            items: {
                create: [
                    { productId: productA.id, quantity: 1, unitPrice: productA.price, totalPrice: productA.price },
                    { productId: productB.id, quantity: 1, unitPrice: productB.price, totalPrice: productB.price },
                ]
            }
        },
        include: { items: true }
    })
    console.log(`✅ Orden creada exitosamente: ID ${order.id} | Total: $${order.totalAmount}`)

    // 5. Simular generación de Boleta Electrónica
    const dte = await prisma.documentDTE.create({
        data: {
            orderId: order.id,
            tenantId: tenant.id,
            type: 'BOLETA_ELECTRONICA',
            folio: Math.floor(Math.random() * 1000) + 1,
            xmlUrl: 'https://ex-api.cl/dte/xml/123',
            pdfUrl: 'https://ex-api.cl/dte/pdf/123',
        }
    })
    console.log(`✅ Boleta Electrónica generada y guardada: Folio ${dte.folio}`)

    console.log('\nPrueba finalizada exitosamente! 🎉')
}

main()
    .catch((e) => {
        console.error('Error en el script de prueba:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
