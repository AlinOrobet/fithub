import Link from "next/link";

import {SectionItemAsImage} from "@/modules/admin/sections/types";
import {Image} from "@/components/image";
import {Skeleton} from "@/components/ui/skeleton";

interface SiteSectionCarouselImageItemProps {
  item: SectionItemAsImage;
}

export const SiteSectionCarouselImageItem = ({item}: SiteSectionCarouselImageItemProps) => {
  return (
    <Link href={item.url}>
      <Image image={item.image} alt={item.title} className="aspect-video" />
    </Link>
  );
};

export const SiteSectionCarouselImageItemSkeleton = () => {
  return <Skeleton className="aspect-video border" />;
};
