import {SidebarTrigger} from "@/components/ui/sidebar";
import {Logo} from "@/components/logo";

export const AdminNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center z-50 bg-background">
      <div className="w-full max-w-screen-2xl mx-auto px-2 border-b">
        <div className="flex items-center gap-4 w-full">
          <div className="grid grid-cols-3 items-center w-full">
            <SidebarTrigger />
            <div className="flex justify-center items-center">
              <Logo href="/admin" className="h-16 w-32" />
            </div>
            <div className="flex-shrink-0 items-center flex justify-end gap-4">
              {/* <AuthButton /> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
