import {SiteLayout} from "@/modules/site/ui/layouts/site-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return <SiteLayout>{children}</SiteLayout>;
};

export default Layout;
