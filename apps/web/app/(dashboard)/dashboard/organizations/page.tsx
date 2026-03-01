import { getOrganizations } from "@/app/lib/actions/organizations";
import { CreateOrganizationDialog } from "@/components/organizations/create-organization-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Building, Plus } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function OrganizationsPage() {
    const session = await auth();

    // @ts-ignore
    if (session?.user?.role !== "ADMIN") {
        redirect("/");
    }

    const organizations = await getOrganizations();

    return (
        <div className="flex flex-col space-y-8 p-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                        Organizaciones
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        Administra las empresas y espacios de trabajo del Holding.
                    </p>
                </div>
                <CreateOrganizationDialog />
            </div>

            {organizations.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/20 border-neutral-200 dark:border-neutral-800">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6 shadow-inner">
                        <Building className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">No hay organizaciones activas</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">
                        Para comenzar a gestionar tus empresas, crea tu primera organización.
                    </p>
                    <div className="mt-8">
                        <CreateOrganizationDialog />
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {organizations.map((org) => (
                        <Card key={org.id} className="group overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                <div className="space-y-1">
                                    <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                                        {org.name}
                                    </CardTitle>
                                    <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                                        ID: {org.id.slice(-8)}
                                    </div>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                                    <Building2 className="h-6 w-6 text-neutral-500 dark:text-neutral-400 group-hover:text-primary" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700/30">
                                        <span className="text-xs font-medium text-neutral-500">Slug</span>
                                        <span className="text-xs font-mono font-bold bg-neutral-200 dark:bg-neutral-700 px-2 py-0.5 rounded-md">
                                            {org.slug || "sin-slug"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center text-neutral-500">
                                            <Users className="mr-2 h-4 w-4 text-primary/60" />
                                            <span className="font-bold text-neutral-900 dark:text-neutral-100 mr-1">1</span>
                                            <span className="text-xs">Miembros</span>
                                        </div>
                                        <div className="flex items-center text-neutral-300 dark:text-neutral-700">|</div>
                                        <div className="flex items-center text-neutral-500">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            <span className="text-xs uppercase font-bold tracking-tighter">Activa</span>
                                        </div>
                                    </div>

                                    <hr className="border-neutral-100 dark:border-neutral-800" />

                                    <div className="flex justify-end gap-2">
                                        <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
                                            Configurar
                                        </button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add placeholder for empty organization slot if admin */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-3xl border-neutral-200 dark:border-neutral-800 opacity-50 hover:opacity-100 transition-opacity cursor-pointer min-h-[220px]">
                        <Plus className="h-8 w-8 text-neutral-400 mb-2" />
                        <span className="text-sm font-bold text-neutral-500">Nueva Empresa</span>
                    </div>
                </div>
            )}
        </div>
    );
}
