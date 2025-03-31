"use client";

import {useEffect, useState} from "react";

import {
  SECTION_ITEM_TYPE,
  SectionItemAsCard,
  SectionItemAsImage,
  SectionItemAsTestimonial,
} from "@/modules/admin/sections/types";

import {SiteSectionCarouselTestimonialItem} from "@/modules/site/ui/components/site-sections/misc/site-section-carousel-testimonial-item";
import {SiteSectionCarouselImageItem} from "@/modules/site/ui/components/site-sections/misc/site-section-carousel-image-item";

import {cn} from "@/lib/utils";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";

interface SiteSectionCarouselProps {
  itemType: SECTION_ITEM_TYPE;
  items?: (SectionItemAsCard | SectionItemAsTestimonial | SectionItemAsImage)[];
  carouselItemClassName?: string;
}

export const SiteSectionCarousel = ({
  itemType,
  items,
  carouselItemClassName,
}: SiteSectionCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (api && selectedIndex !== -1) {
      api.scrollTo(selectedIndex);
    }
  }, [api, selectedIndex]);

  if (!items || !items.length) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-5 w-full">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className={cn(carouselItemClassName)}>
              {itemType === "testimonial" && (
                <SiteSectionCarouselTestimonialItem item={item as SectionItemAsTestimonial} />
              )}
              {itemType === "image" && (
                <SiteSectionCarouselImageItem item={item as SectionItemAsImage} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {items.length > 1 && (
        <div className="flex items-center justify-center">
          <div className="flex flex-row items-center gap-x-1">
            {new Array(items.length).fill(" ").map((_, index) => (
              <div
                key={index}
                className={cn(
                  "size-3 rounded-full cursor-pointer transition-all duration-300",
                  index === current ? "bg-primary" : "bg-white/50"
                )}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
