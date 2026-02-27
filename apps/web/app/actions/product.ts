"use server";

import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createProduct(formData: FormData) {
    const session = await auth();
    // En multi-tenant real, deberíamos sacar el tenantId de la sesión.
    // Usaremos el primero por motivos del demo.
    const tenant = await prisma.tenant.findFirst();

    if (!tenant) {
        throw new Error("No primary tenant found.");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string);
    const categoryName = formData.get("category") as string; // Ideally should be categoryId, but doing this simple for the demo

    // Find or create category
    let category = null;
    if (categoryName) {
        category = await prisma.category.findFirst({
            where: { name: { equals: categoryName, mode: 'insensitive' }, tenantId: tenant.id }
        });

        if (!category) {
            category = await prisma.category.create({
                data: { name: categoryName, tenantId: tenant.id }
            });
        }
    }

    await prisma.product.create({
        data: {
            name,
            description,
            price: isNaN(price) ? 0 : price,
            stock: isNaN(stock) ? 0 : stock,
            tenantId: tenant.id,
            categoryId: category?.id
        }
    });

    revalidatePath("/inventory");
    revalidatePath("/products");

    redirect("/inventory");
}

export async function deleteProduct(productId: string) {
    const tenant = await prisma.tenant.findFirst();

    if (!tenant) return;

    await prisma.product.deleteMany({
        where: {
            id: productId,
            tenantId: tenant.id
        }
    });

    revalidatePath("/inventory");
    revalidatePath("/products");
}
