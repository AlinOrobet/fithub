import {SiteNavbar} from "@/modules/site/ui/components/site-navbar";
import {SiteFooter} from "@/modules/site/ui/components/site-footer";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export const SiteLayout = ({children}: SiteLayoutProps) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <SiteNavbar />
      <main className="flex flex-1 pt-16 h-full">{children}</main>
      <SiteFooter />
    </div>
  );
};
