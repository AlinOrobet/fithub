import {cva, VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import {Skeleton} from "@/components/ui/skeleton";

const titleVariants = cva("font-nevan", {
  variants: {
    size: {
      default: "xm:text-2xl sm:text-3xl md:text-4xl min-h-8 sm:min-10 md:min-h-12",
    },
    direction: {
      left: "justify-start text-left",
      right: "justify-end text-right",
      center: "justify-center text-center",
    },
  },
  defaultVariants: {
    direction: "left",
    size: "default",
  },
});

interface SiteSectionTitleProps extends VariantProps<typeof titleVariants> {
  title: string;
  hideSeparator?: boolean;
}

export const SiteSectionTitle = ({
  title,
  size,
  direction,
  hideSeparator = false,
}: SiteSectionTitleProps) => {
  return (
    <div className={cn("w-full flex", titleVariants({direction}))}>
      <div className="w-fit">
        <h3 className={cn(titleVariants({size, direction}))}>{title}</h3>
        {!hideSeparator && <Separator />}
      </div>
    </div>
  );
};

export const SiteSectionTitleSkeleton = ({size, direction}: SiteSectionTitleProps) => {
  return (
    <div className={cn("w-full flex", titleVariants({direction}))}>
      <div className="w-[60%]">
        <Skeleton className={cn(titleVariants({size, direction}))} />
      </div>
    </div>
  );
};
