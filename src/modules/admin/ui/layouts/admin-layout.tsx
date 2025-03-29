import {SidebarProvider} from "@/components/ui/sidebar";
import {AdminNavbar} from "../components/admin-navbar";
import {AdminSidebar} from "../components/admin-sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({children}: AdminLayoutProps) => {
  return (
    <div className="h-full relative">
      <SidebarProvider className="absolute top-0 left-0 h-full">
        <div className="w-full">
          <AdminNavbar />
          <div className="flex min-h-screen max-w-screen-2xl mx-auto">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto pt-[4rem]">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
