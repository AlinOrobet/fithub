import {cva, VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

const subtitleVariants = cva("font-roboto", {
  variants: {
    size: {
      default: "xm:text-xl sm:text-2xl md:text-3xl min-h-8 sm:min-10 md:min-h-12",
    },
    direction: {
      left: "justify-start",
      right: "justify-end",
      center: "justify-center",
    },
  },
  defaultVariants: {
    direction: "left",
    size: "default",
  },
});

interface SiteSectionSubtitleProps extends VariantProps<typeof subtitleVariants> {
  subtitle?: string;
}

export const SiteSectionSubtitle = ({subtitle, size, direction}: SiteSectionSubtitleProps) => {
  if (!subtitle) {
    return null;
  }

  return (
    <div className={cn("w-full flex", subtitleVariants({direction}))}>
      <h5 className={cn(subtitleVariants({size, direction}))}>{subtitle}</h5>
    </div>
  );
};

export const SiteSectionSubtitleSkeleton = ({size, direction}: SiteSectionSubtitleProps) => {
  return (
    <div className={cn("w-full flex", subtitleVariants({direction}))}>
      <div className="w-[80%]">
        <Skeleton className={cn(subtitleVariants({size, direction}))} />
      </div>
    </div>
  );
};
