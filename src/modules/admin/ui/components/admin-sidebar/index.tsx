import {Logo} from "@/components/logo";
import {Sidebar, SidebarContent, SidebarHeader} from "@/components/ui/sidebar";
import {SidebarItems} from "@/modules/admin/ui/components/admin-sidebar/sidebar-items";

export const AdminSidebar = () => {
  return (
    <Sidebar className="z-40 pt-16 bg-background" collapsible="icon">
      <SidebarHeader className="w-full h-24 flex items-center justify-center border-b bg-background lg:hidden">
        <Logo href="/admin" className="h-16 w-36" />
      </SidebarHeader>
      <SidebarContent className="bg-background pb-5">
        <SidebarItems />
      </SidebarContent>
    </Sidebar>
  );
};
