import {Section} from "@/modules/admin/sections/types";

import {SiteSectionCarousel} from "@/modules/site/ui/components/site-sections//misc/site-section-carousel";
import {
  SiteSectionTitle,
  SiteSectionTitleSkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-title";
import {SiteSectionCarouselTestimonialItemSkeleton} from "@/modules/site/ui/components/site-sections/misc/site-section-carousel-testimonial-item";

interface SiteTestimonialsSectionProps {
  section: Section;
}

export const SiteTestimonialsSection = ({section}: SiteTestimonialsSectionProps) => {
  return (
    <section className="space-y-5">
      <SiteSectionTitle title={section.title} direction="left" />
      <SiteSectionCarousel
        items={section.items}
        itemType="testimonial"
        carouselItemClassName="md:basis-1/2"
      />
    </section>
  );
};

export const SiteTestimonialsSectionSkeleton = () => {
  return (
    <section className="space-y-5">
      <SiteSectionTitleSkeleton title="" direction="left" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="hidden md:inline">
          <SiteSectionCarouselTestimonialItemSkeleton />
        </div>
        <SiteSectionCarouselTestimonialItemSkeleton />
      </div>
    </section>
  );
};
