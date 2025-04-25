import {useRef} from "react";
import {VideoIcon} from "lucide-react";

import {Video} from "@/components/video";
import {Button} from "@/components/ui/button";

import {cn} from "@/lib/utils";

interface VideoFieldProps {
  value: string | File | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: VoidFunction;
  isPending: boolean;
  previewUrl: string | null;
}

export const VideoField = ({value, onChange, onDelete, isPending, previewUrl}: VideoFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {value instanceof File && previewUrl ? (
        <div className="relative">
          <Video />
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
          <VideoIcon
            className={cn("size-14", isPending ? "text-muted-foreground" : "text-white")}
          />
        </div>
      )}
    </>
  );
};
