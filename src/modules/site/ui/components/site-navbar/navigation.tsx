import {Routes} from "@/modules/site/ui/components/site-navbar/routes";
import {MobileNavigation} from "@/modules/site/ui/components/site-navbar/mobile-navigation";

export const Navigation = () => {
  return (
    <nav>
      <div className="hidden lg:inline">
        <Routes />
      </div>
      <MobileNavigation />
    </nav>
  );
};
