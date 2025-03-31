import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";

import {DIRECTIONS, Section} from "@/modules/admin/sections/types";

import {
  SiteNormalSection,
  SiteNormalSectionSkeleton,
} from "@/modules/site/ui/components/site-sections/site-normal-section";
import {
  SiteCarouselSection,
  SiteCarouselSectionSkeleton,
} from "@/modules/site/ui/components/site-sections/site-carousel-section";
import {
  SiteTestimonialsSection,
  SiteTestimonialsSectionSkeleton,
} from "@/modules/site/ui/components/site-sections/site-testimonials-section";

export const SiteSections = () => {
  return (
    <Suspense fallback={<SiteSectionSkeleton />}>
      <ErrorBoundary fallback={<div>err</div>}>
        <SiteSectionContent />
      </ErrorBoundary>
    </Suspense>
  );
};

export const SiteSectionSkeleton = () => {
  return (
    <div className="w-full space-y-10 my-10">
      {[
        {type: "normal", direction: "left", displayImage: true, displayItems: true},
        {type: "carousel"},
        {type: "normal", direction: "left"},
        {
          type: "normal",
          direction: "center",
          displayCards: true,
        },
        {type: "testimonials", direction: "left", displayImage: false, displayItems: false},
        {
          type: "normal",
          direction: "center",
        },
      ].map(({type, direction, displayImage, displayItems, displayCards}, index) => (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6" key={index}>
          {type === "normal" && (
            <SiteNormalSectionSkeleton
              direction={direction as DIRECTIONS}
              displayImage={displayImage}
              displayItems={displayItems}
              displayCards={displayCards}
            />
          )}
          {type === "testimonials" && <SiteTestimonialsSectionSkeleton />}
          {type === "carousel" && <SiteCarouselSectionSkeleton />}
        </div>
      ))}
    </div>
  );
};

export const SiteSectionContent = () => {
  return (
    <div className="w-full space-y-10 my-10">
      {sections.map((section, index) => (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6" key={index}>
          {section.sectionType === "normal" && <SiteNormalSection section={section} />}
          {section.sectionType === "carousel" && <SiteCarouselSection section={section} />}
          {section.sectionType === "testimonials" && <SiteTestimonialsSection section={section} />}
        </div>
      ))}
    </div>
  );
};

const sections: Section[] = [];
