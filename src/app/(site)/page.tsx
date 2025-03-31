import {SiteHeroBanner} from "@/modules/site/ui/components/site-hero-banner";
import {SiteSections} from "@/modules/site/ui/components/site-sections";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      <SiteHeroBanner />
      <SiteSections />
    </div>
  );
}
