import NextImage from "next/image";

import {cn} from "@/lib/utils";

interface ImageProps {
  image: string;
  alt: string;
  className?: string;
}

export const Image = ({image, alt, className}: ImageProps) => {
  return (
    <div className={cn("relative", className)}>
      <NextImage
        src={image || "/placeholder.png"}
        alt={alt}
        fill
        className="object-center object-contain"
      />
    </div>
  );
};
