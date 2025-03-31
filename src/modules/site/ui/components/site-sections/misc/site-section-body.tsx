import {DIRECTIONS} from "@/modules/admin/sections/types";

import {
  SiteSectionTitle,
  SiteSectionTitleSkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-title";
import {
  SiteSectionSubtitle,
  SiteSectionSubtitleSkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-subtitle";
import {
  SiteSectionDescription,
  SiteSectionDescriptionSkeleton,
} from "@/modules/site/ui/components/site-sections/misc/site-section-description";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

interface SiteSectionBodyProps {
  children?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  action?: string;
  direction?: DIRECTIONS;
}

export const SiteSectionBody = ({
  children,
  title,
  subtitle,
  description,
  action,
  direction = "left",
}: SiteSectionBodyProps) => {
  return (
    <section>
      <div className={cn("space-y-5", direction === "right" && "order-2")}>
        <SiteSectionTitle title={title} direction={direction} />
        <div>
          <SiteSectionSubtitle subtitle={subtitle} direction={direction} />
          <SiteSectionDescription description={description} direction={direction} />
        </div>
        {children}
        {action && (
          <div
            className={cn(
              "flex w-full pt-5",
              direction === "center"
                ? "justify-center"
                : direction === "right"
                ? "justify-end"
                : "justify-start"
            )}
          >
            <Button variant="offset">{action}</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export const SiteSectionBodySkeleton = ({
  children,
  direction,
  displayCards,
}: {
  children: React.ReactNode;
  direction: DIRECTIONS;
  displayCards?: boolean;
}) => {
  return (
    <section>
      <div className={cn("space-y-5", direction === "right" && "order-2")}>
        <SiteSectionTitleSkeleton title="" direction={direction} />
        <div className="space-y-2.5">
          <SiteSectionSubtitleSkeleton direction={direction} />
          <SiteSectionDescriptionSkeleton direction={direction} />
        </div>
        {children}
        {!displayCards && (
          <div
            className={cn(
              "flex w-full pt-5",
              direction === "center"
                ? "justify-center"
                : direction === "right"
                ? "justify-end"
                : "justify-start"
            )}
          >
            <Button variant="offset" disabled className="min-w-[232px]">
              <Loader2 className="animate-spin" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
