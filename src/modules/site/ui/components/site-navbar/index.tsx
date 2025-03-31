import {Logo} from "@/components/logo";
import {Separator} from "@/components/ui/separator";

import {Navigation} from "@/modules/site/ui/components/site-navbar/navigation";
import {UserActions} from "@/modules/site/ui/components/site-navbar/user-actions";

export const SiteNavbar = () => {
  return (
    <header className="fixed top-0 w-full bg-background z-50">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 lg:grid-cols-5">
          <div className="col-span-1 lg:col-span-2 flex items-center justify-start">
            <Navigation />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <Logo href="/" className="h-16 w-32" />
          </div>
          <div className="col-span-1 lg:col-span-2 flex items-center justify-end">
            <UserActions />
          </div>
        </div>
      </nav>
      <Separator />
    </header>
  );
};
