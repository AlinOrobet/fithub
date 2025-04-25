import {useRef} from "react";
import {Images} from "lucide-react";

import {Image} from "@/components/image";
import {Button} from "@/components/ui/button";

import {cn} from "@/lib/utils";

interface ImageFieldProps {
  value: string | File | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: VoidFunction;
  isPending: boolean;
  previewUrl: string | null;
}

export const ImageField = ({value, onChange, onDelete, isPending, previewUrl}: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {value instanceof File && previewUrl ? (
        <div className="relative">
          <Image
            image={previewUrl || "/placeholder.svg"}
            alt="image"
            className="aspect-video rounded-md object-contain"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={onDelete}
            disabled={isPending}
          >
            Șterge
          </Button>
        </div>
      ) : (
        <div
          className="w-full rounded-md border flex flex-col justify-center items-center aspect-video space-y-4 cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <input
            type="file"
            className="hidden"
            accept=".jpg, .png, .jpeg, .svg, .webp"
            ref={inputRef}
            onChange={onChange}
            disabled={isPending}
          />
          <Images className={cn("size-14", isPending ? "text-muted-foreground" : "text-white")} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className={cn("text-xs", isPending ? "text-muted-foreground" : "text-white")}>
              JPG, PNG, SVG, JPEG, WEBP
            </p>
            <p className="text-xs text-muted-foreground">(max 5Mb)</p>
          </div>
        </div>
      )}
    </>
  );
};
