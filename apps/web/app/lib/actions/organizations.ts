"use server";
// Force HMR recompilation
import { auth } from "@/auth";
import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createOrganizationSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
});

export async function createOrganization(prevState: any, formData: FormData) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "No autorizado" };
    }

    const validatedFields = createOrganizationSchema.safeParse({
        name: formData.get("name"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error?.errors[0]?.message || "Error" };
    }

    const { name } = validatedFields.data;

    try {
        // 1. Crear el Tenant (Organización)
        const tenant = await prisma.tenant.create({
            data: {
                name,
                slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
            },
        });

        // 2. Asociar el usuario actual como miembro de este Tenant
        await prisma.user.update({
            where: { id: session.user.id },
            data: { tenantId: tenant.id },
        });

        revalidatePath("/organizations");

        return { success: true, tenant };
    } catch (error) {
        console.error("Error creating organization:", error);
        return { error: "Error al crear la organización. Inténtalo de nuevo." };
    }
}

export async function getOrganizations() {
    const session = await auth();

    if (!session?.user?.id) {
        return [];
    }

    // Obtenemos los Tenants a los que pertenece el usuario (en el esquema actual es un 1-N, 
    // pero buscaremos todos los que este usuario tenga directamente o donde sea creador)
    // Por ahora, como User tiene tenantId, un usuario pertenece a un Tenant primario.
    // Para mostrar varios, buscaremos el Tenant al que pertenece.

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { tenant: true },
    });

    if (user?.tenant) {
        return [user.tenant];
    }

    return [];
}
