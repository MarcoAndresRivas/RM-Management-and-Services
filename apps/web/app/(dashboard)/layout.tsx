import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { getOrganizations } from "@/app/lib/actions/organizations"
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
            <div className="flex min-h-screen w-full">
                <AppSidebar isAdmin={isAdmin} />
                <div className="flex flex-col w-full flex-1 overflow-hidden">
                    <SiteHeader />
                    <main className="flex-1 overflow-y-auto bg-muted/40 p-4 md:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
