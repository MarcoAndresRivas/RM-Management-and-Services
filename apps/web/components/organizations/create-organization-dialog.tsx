"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createOrganization } from "@/app/lib/actions/organizations";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Building2 } from "lucide-react";
import { toast } from "sonner";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creando..." : "Crear Organización"}
        </Button>
    );
}

export function CreateOrganizationDialog({ children }: { children?: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    async function action(formData: FormData) {
        const result = await createOrganization(undefined, formData);

        if (result?.error) {
            toast.error(result.error);
        } else if (result?.success) {
            toast.success("Organización creada exitosamente");
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Organización
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center">
                        <Building2 className="mr-2 h-5 w-5" />
                        Crear Organización
                    </DialogTitle>
                    <DialogDescription>
                        Agrega una nueva empresa o espacio de trabajo a tu cuenta.
                    </DialogDescription>
                </DialogHeader>
                <form action={action} className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre de la Organización</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Ej. Acme Corp, Mi Empresa SpA"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <SubmitButton />
                </form>
            </DialogContent>
        </Dialog>
    );
}
