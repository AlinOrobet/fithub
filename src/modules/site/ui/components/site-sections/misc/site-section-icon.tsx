import Link from "next/link";

import {SectionItemAsImage} from "@/modules/admin/sections/types";

import {Image} from "@/components/image";
import {Skeleton} from "@/components/ui/skeleton";

interface SiteSectionIconProps {
  item: SectionItemAsImage;
}

export const SiteSectionIcon = ({item}: SiteSectionIconProps) => {
  return (
    <Link href={item.url} className="flex flex-col items-center space-y-1 aspect-square">
      <Image image={item.image} alt={item.title} className="aspect-square h-full" />
      <p className="text-center font-bold text-base max-w-[130px] uppercase">{item.title}</p>
    </Link>
  );
};

export const SiteSectionIconSkeleton = () => {
  return (
    <div className="flex flex-col items-center space-y-1 aspect-square">
      <Skeleton className="aspect-square h-full" />
      <Skeleton className="h-12 max-w-[130px] w-full" />
    </div>
  );
};
