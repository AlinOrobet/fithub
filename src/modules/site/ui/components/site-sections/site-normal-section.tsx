import {DIRECTIONS, Section, SectionItemAsImage} from "@/modules/admin/sections/types";

import {cn} from "@/lib/utils";
import {Image} from "@/components/image";
import {Video} from "@/components/video";
import {
  SiteSectionIcon,
  SiteSectionIconSkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-icon";
import {
  SiteSectionBody,
  SiteSectionBodySkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-body";

import {Skeleton} from "@/components/ui/skeleton";

interface SiteNormalSectionProps {
  section: Section;
}

export const SiteNormalSection = ({section}: SiteNormalSectionProps) => {
  return (
    <section>
      <div
        className={cn(
          "grid grid-cols-1 gap-6 items-center",
          (section.image || section.video) && "md:grid-cols-2"
        )}
      >
        <SiteSectionBody {...section}>
          {section.items && section.items.length > 0 && (
            <div className={cn("grid gap-4 grid-cols-3")}>
              {section.items.map((item, index) => (
                <SiteSectionIcon key={index} item={item as SectionItemAsImage} />
              ))}
            </div>
          )}
        </SiteSectionBody>
        {(section.image || section.video) && (
          <div className={cn("")}>
            {section.image && (
              <Image
                image={section.image}
                alt={section.title}
                className={cn("aspect-square border")}
              />
            )}
            {section.video && <Video />}
          </div>
        )}
      </div>
    </section>
  );
};

export const SiteNormalSectionSkeleton = ({
  direction,
  displayImage,
  displayItems,
  displayCards,
}: {
  direction: DIRECTIONS;
  displayImage?: boolean;
  displayItems?: boolean;
  displayCards?: boolean;
}) => {
  return (
    <section
      className={cn("grid grid-cols-1 gap-6 items-center", displayImage && "md:grid-cols-2")}
    >
      <div className={cn(direction === "right" && "order-2")}>
        <SiteSectionBodySkeleton direction={direction} displayCards={displayCards}>
          {displayItems && (
            <div className={cn("grid gap-4 grid-cols-3")}>
              {new Array(3).fill(" ").map((_, index) => (
                <SiteSectionIconSkeleton key={index} />
              ))}
            </div>
          )}
        </SiteSectionBodySkeleton>
      </div>

      {displayImage && <Skeleton className="aspect-square border" />}
    </section>
  );
};
