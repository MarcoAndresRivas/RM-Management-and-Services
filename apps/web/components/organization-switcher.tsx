"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CreateOrganizationDialog } from "@/components/organizations/create-organization-dialog";

type Tenant = {
    id: string;
    name: string;
    slug: string | null;
};

export function OrganizationSwitcher({ organizations }: { organizations: Tenant[] }) {
    const [open, setOpen] = React.useState(false);
    const [activeOrg, setActiveOrg] = React.useState<Tenant | null>(organizations[0] || null);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    <div className="flex items-center gap-2 truncate">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                            <Building2 className="h-3 w-3 text-primary" />
                        </div>
                        <span className="truncate">
                            {activeOrg ? activeOrg.name : "Seleccionar org..."}
                        </span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar organización..." />
                    <CommandList>
                        <CommandEmpty>No se encontraron.</CommandEmpty>
                        <CommandGroup heading="Tus organizaciones">
                            {organizations.map((org) => (
                                <CommandItem
                                    key={org.id}
                                    value={org.name}
                                    onSelect={() => {
                                        setActiveOrg(org);
                                        setOpen(false);
                                    }}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/10">
                                        <Building2 className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="truncate">{org.name}</span>
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            activeOrg?.id === org.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CreateOrganizationDialog>
                                <CommandItem
                                    onSelect={() => {
                                        setOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    <Button variant="ghost" className="w-full justify-start h-auto p-0 font-normal">
                                        Crear nueva org...
                                    </Button>
                                </CommandItem>
                            </CreateOrganizationDialog>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
