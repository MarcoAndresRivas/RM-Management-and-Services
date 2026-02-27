import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, User, Settings, Building, Package, ShoppingCart } from "lucide-react"

export function AppSidebar({ isAdmin }: { isAdmin?: boolean }) {
    return (
        <Sidebar>
            <SidebarHeader className="h-16 flex items-center justify-center border-b">
                <h2 className="text-lg font-bold">RM ERP</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/dashboard">
                                    <LayoutDashboard className="mr-2 h-4 w-4" />
                                    <span>Dashboard</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/customers">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Customers</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {isAdmin && (
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/organizations">
                                        <Building className="mr-2 h-4 w-4" />
                                        <span>Organizations</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )}
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/inventory">
                                    <Package className="mr-2 h-4 w-4" />
                                    <span>Inventory</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/orders">
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    <span>Orders</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/employees">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Employees</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <a href="/settings">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t text-sm text-gray-500">
                © 2026 RM Management
            </SidebarFooter>
        </Sidebar>
    )
}
