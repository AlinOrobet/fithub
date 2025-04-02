import Image from "next/image";
import {z} from "zod";
import {useRef} from "react";
import {useForm} from "react-hook-form";

import {Images} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {createMediaSchema} from "@/modules/admin/(media)/images/schemas";

import {Form, FormField, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";

interface CreateMediaFormProps {
  onClose: VoidFunction;
}

export const CreateMediaForm = ({onClose}: CreateMediaFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const {mutate, isPending} = useCreateMedia();
  const isPending = false;
  const form = useForm<z.infer<typeof createMediaSchema>>({
    resolver: zodResolver(createMediaSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof createMediaSchema>) => {
    const finalValues = {
      source: values.source instanceof File ? values.source : values.source || "",
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("source", file);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="source"
            render={({field}) => (
              <div className="flex flex-col space-y-2">
                {field.value ? (
                  <div className="relative w-full rounded-md aspect-video">
                    <Image
                      src={
                        field.value instanceof File ? URL.createObjectURL(field.value) : field.value
                      }
                      alt="image"
                      fill
                      className="rounded-md object-contain"
                    />
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
                      onChange={handleImageChange}
                      disabled={isPending}
                    />
                    <Images className="size-14" />
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-xs">JPG, PNG, SVG, JPEG, WEBP</p>
                      <p className="text-xs text-muted-foreground">(max 50Mb)</p>
                    </div>
                  </div>
                )}
                <FormMessage />
              </div>
            )}
          />
          <div className="flex items-center justify-end gap-x-2">
            <Button type="button" variant="ghost" size="lg" onClick={onClose} disabled={isPending}>
              Închide
            </Button>
            <Button type="submit" disabled={isPending} size="lg">
              Crează
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
