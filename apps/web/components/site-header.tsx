import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { auth, signOut } from "@/auth"
import { OrganizationSwitcher } from "@/components/organization-switcher"
import { getOrganizations } from "@/app/lib/actions/organizations"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export async function SiteHeader() {
    const session = await auth();
    // @ts-ignore
    const isAdmin = session?.user?.role === "ADMIN";
    const userEmail = session?.user?.email || "usuario@ejemplo.com";
    const userName = session?.user?.name || "Usuario";

    let organizations: any[] = [];
    if (isAdmin) {
        organizations = await getOrganizations();
    }

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-white/5 bg-brand-blue/60 backdrop-blur-xl px-4 sm:px-6">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1 text-brand-slate hover:text-brand-white transition-colors" />
                <Separator orientation="vertical" className="h-6 bg-white/5" />

                {isAdmin && organizations && (
                    <div className="hidden md:flex">
                        <OrganizationSwitcher organizations={organizations} />
                    </div>
                )}
            </div>

            <div className="flex-1 flex justify-end items-center gap-4">
                <Button variant="ghost" size="icon" className="relative group hover:bg-white/5 rounded-xl transition-all">
                    <Bell className="h-5 w-5 text-brand-slate group-hover:text-brand-cyan transition-colors" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(14,165,233,0.8)] animate-pulse"></span>
                    <span className="sr-only">Notifications</span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-xl border border-white/5 bg-white/5 p-0 hover:bg-white/10 transition-all">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src="" alt={userName} />
                                <AvatarFallback className="bg-brand-cyan/20 text-brand-cyan font-black text-xs">
                                    {userName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 mt-2 p-2 rounded-2xl bg-brand-blue/90 backdrop-blur-2xl border border-white/10 shadow-2xl" align="end">
                        <DropdownMenuLabel className="font-normal p-3">
                            <div className="flex flex-col space-y-2">
                                <p className="text-sm font-black text-brand-white leading-none tracking-tight">{userName}</p>
                                <p className="text-xs font-medium text-brand-slate leading-none">
                                    {userEmail}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5 mx-1" />
                        <DropdownMenuItem className="p-3 focus:bg-white/5 rounded-xl cursor-pointer gap-3">
                            <User className="w-4 h-4 text-brand-cyan" /> Perfil de Usuario
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-3 focus:bg-white/5 rounded-xl cursor-pointer gap-3">
                            <Settings className="w-4 h-4 text-brand-cyan" /> Ajustes ERP
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5 mx-1" />
                        <form action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}>
                            <button type="submit" className="w-full">
                                <DropdownMenuItem className="p-3 focus:bg-red-500/10 text-red-400 rounded-xl cursor-pointer gap-3 focus:text-red-400">
                                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                                </DropdownMenuItem>
                            </button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

