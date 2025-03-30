import {SiteNavbar} from "@/modules/site/ui/components/site-navbar";
import {SiteFooter} from "@/modules/site/ui/components/site-footer";
import {HydrateClient, trpc} from "@/trpc/server";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export const SiteLayout = ({children}: SiteLayoutProps) => {
  void trpc.auth.getCurrentUser.prefetch();
  return (
    <HydrateClient>
      <div className="relative flex flex-col min-h-screen">
        <SiteNavbar />
        <main className="flex flex-1 pt-16 h-full">{children}</main>
        <SiteFooter />
      </div>
    </HydrateClient>
  );
};
