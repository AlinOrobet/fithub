import {SectionItemAsTestimonial} from "@/modules/admin/sections/types";

import {Skeleton} from "@/components/ui/skeleton";
import {Image} from "@/components/image";

interface SiteSectionCarouselTestimonialItemProps {
  item: SectionItemAsTestimonial;
}

export const SiteSectionCarouselTestimonialItem = ({
  item,
}: SiteSectionCarouselTestimonialItemProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h5 className="text-center line-clamp-1 font-semibold">
        {item.userName.split(" ")[0]} - {`"${item.title}"`}
      </h5>
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div className="flex flex-col w-full h-full">
          <div className="relative">
            <Image image={item.beforeImage} alt={item.title} className="aspect-square border" />
            <div className="absolute -bottom-5 -right-5 size-10">
              <Image image="/arrow.svg" alt="custom arrow" className="aspect-square h-full z-10" />
            </div>
            <div className="absolute inset-0 flex justify-center">
              <p className="font-nevan bg-muted/30 w-fit h-fit p-1.5">BEFORE</p>
            </div>
          </div>
          <div className="flex flex-col space-y-0.5 mt-2 h-full">
            <p className="text-sm sm:text-base md:text-lg font-medium text-white">
              {item.courseName}
            </p>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground line-clamp-4 xs:line-clamp-5 xm:line-clamp-6">
              {item.description}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="relative">
            <Image image={item.beforeImage} alt={item.title} className="aspect-[9/16] border" />
            <div className="absolute inset-0 flex justify-center">
              <p className="font-nevan bg-muted/30 w-fit h-fit p-1.5">AFTER</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SiteSectionCarouselTestimonialItemSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <Skeleton className="h-7 w-[80%]" />
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div className="flex flex-col w-full h-full">
          <Skeleton className="aspect-square border" />
          <div className="flex flex-col space-y-1 mt-1.5 h-full">
            <Skeleton className="h-5 sm:h-6 w-[70%]" />
            <Skeleton className="h-16 xs:h-20 md:h-full w-full" />
          </div>
        </div>
        <div className="w-full">
          <Skeleton className="relative aspect-[9/16] border" />
        </div>
      </div>
    </div>
  );
};
