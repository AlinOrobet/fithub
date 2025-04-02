import {SidebarProvider} from "@/components/ui/sidebar";
import {AdminNavbar} from "@/modules/admin/ui/components/admin-navbar";
import {AdminSidebar} from "@/modules/admin/ui/components/admin-sidebar";
import {HydrateClient, trpc} from "@/trpc/server";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({children}: AdminLayoutProps) => {
  void trpc.auth.getCurrentUser.prefetch();
  return (
    <HydrateClient>
      <div className="h-full relative">
        <SidebarProvider className="absolute top-0 left-0 h-full">
          <div className="w-full">
            <AdminNavbar />
            <div className="flex min-h-screen max-w-screen-2xl mx-auto">
              <AdminSidebar />
              <main className="flex-1 overflow-y-auto pt-[5rem] px-4 sm:px-6 pb-4 sm:pb-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </HydrateClient>
  );
};
