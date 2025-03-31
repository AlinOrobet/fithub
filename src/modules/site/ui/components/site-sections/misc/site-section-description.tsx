import {cva, VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {HTMLContent} from "@/components/html-content";
import {Skeleton} from "@/components/ui/skeleton";

const descriptionVariants = cva("font-roboto", {
  variants: {
    direction: {
      left: "justify-start text-left",
      right: "justify-end text-right",
      center: "justify-center text-center",
    },
  },
  defaultVariants: {
    direction: "left",
  },
});

interface SiteSectionDescriptionProps extends VariantProps<typeof descriptionVariants> {
  description?: string;
}

export const SiteSectionDescription = ({description, direction}: SiteSectionDescriptionProps) => {
  if (!description) {
    return null;
  }

  return (
    <div className={cn("w-full flex", descriptionVariants({direction}))}>
      <HTMLContent content={description} />
    </div>
  );
};

export const SiteSectionDescriptionSkeleton = ({direction}: SiteSectionDescriptionProps) => {
  return (
    <div className={cn("w-full flex", descriptionVariants({direction}))}>
      <Skeleton className={cn("min-h-[300px] w-full", descriptionVariants({direction}))} />
    </div>
  );
};
