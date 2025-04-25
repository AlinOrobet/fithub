"use client";

import type {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";

import {createMediaSchema} from "@/modules/admin/(media)/schemas";
import {useMediaActions} from "@/modules/admin/(media)/actions";
import {DialogActions} from "@/components/dialog-actions";
import {ImageField} from "@/components/form/image-field";

import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

interface CreateVideoFormProps {
  onClose: VoidFunction;
}

export const CreateVideoForm = ({onClose}: CreateVideoFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createMediaSchema>>({
    resolver: zodResolver(createMediaSchema),
    defaultValues: {
      name: "",
      source: undefined,
    },
  });

  const {isPending, createMedia} = useMediaActions({
    onClose: () => {
      form.reset();
      setPreviewUrl(null);
      onClose();
    },
  });

  const onSubmit = async (values: z.infer<typeof createMediaSchema>) => {
    await createMedia(values);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("source", file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Alias</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Introdu un alias pentru imagine"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="source"
            render={() => (
              <div className="flex flex-col space-y-2">
                <FormLabel>Videoclip</FormLabel>
                <ImageField
                  value={form.watch("source")}
                  onChange={(e) => handleImageChange(e)}
                  onDelete={() => {
                    form.setValue("source", undefined);
                    setPreviewUrl(null);
                  }}
                  isPending={isPending}
                  previewUrl={previewUrl}
                />
                <FormMessage />
              </div>
            )}
          />
          <DialogActions
            onClose={onClose}
            isPending={isPending}
            isDisabled={!form.watch("source")}
          />
        </form>
      </Form>
    </div>
  );
};
