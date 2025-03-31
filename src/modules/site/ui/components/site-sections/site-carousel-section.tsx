import {Section} from "@/modules/admin/sections/types";

import {SiteSectionCarousel} from "@/modules/site/ui/components/site-sections//misc/site-section-carousel";
import {
  SiteSectionTitle,
  SiteSectionTitleSkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-title";
import {SiteSectionCarouselImageItemSkeleton} from "@/modules/site/ui/components/site-sections/misc/site-section-carousel-image-item";
import {Separator} from "@/components/ui/separator";

interface SiteCarouselSectionProps {
  section: Section;
}

export const SiteCarouselSection = ({section}: SiteCarouselSectionProps) => {
  return (
    <section className="space-y-5">
      <SiteSectionTitle title={section.title} direction="center" hideSeparator />
      <div className="space-y-2.5">
        <Separator />
        <SiteSectionCarousel items={section.items} itemType="image" />
        <Separator />
      </div>
    </section>
  );
};

export const SiteCarouselSectionSkeleton = () => {
  return (
    <section className="space-y-5">
      <SiteSectionTitleSkeleton title="" direction="center" />
      <SiteSectionCarouselImageItemSkeleton />
    </section>
  );
};
