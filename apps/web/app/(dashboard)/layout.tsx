import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { auth } from "@/auth"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    // @ts-ignore
    const isAdmin = session?.user?.role === "ADMIN";

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-brand-blue font-sans selection:bg-brand-cyan/30 selections:text-brand-white">
                <AppSidebar isAdmin={isAdmin} />
                <div className="flex flex-col w-full flex-1 overflow-hidden relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] pointer-events-none -z-10 rounded-full" />

                    <SiteHeader />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}

