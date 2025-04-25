import {z} from "zod";
import {useState} from "react";
import {toast} from "sonner";

import {trpc} from "@/trpc/client";
import {createMediaSchema} from "@/modules/admin/(media)/schemas";

type Props = {
  onClose?: VoidFunction;
};

export const useMediaActions = ({onClose}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const utils = trpc.useUtils();

  const createDbRecord = trpc.media.createMedia.useMutation({
    onSuccess: () => {
      utils.media.getMany.invalidate();
      onClose?.();
      toast.success("Fișierul media a fost încărcat cu succes!");
    },
    onError: async (error) => {
      if (error instanceof Error) {
        try {
          await deleteFromBucket(error.message);
        } catch (deleteError) {
          console.error(deleteError);
          toast.error("A apărut o eroare la ștergerea din Bucket.");
        }
      }
    },
  });

  const deleteDbRecord = trpc.media.deleteOne.useMutation({
    onSuccess: () => {
      utils.media.getMany.invalidate();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const deleteFromBucket = async (id: string) => {
    try {
      const response = await fetch("/api/upload", {
        method: "DELETE",
        body: JSON.stringify({id}),
      });

      if (!response.ok) {
        throw new Error("A apărut o eroare la ștergerea din Bucket.");
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "Eroare la încărcarea fișierului");
      }
    }
  };

  const createMedia = async (values: z.infer<typeof createMediaSchema>) => {
    if (!values.source || !(values.source instanceof File)) {
      toast.error("Te rugăm să selectezi un fișier");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", values.source);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Eroare la încărcarea fișierului.");
      }

      const data = await response.json();

      await createDbRecord.mutateAsync({
        id: data.fileId,
        name: values.name || data.name,
        url: data.url,
        size: data.size,
      });
    } catch (error) {
      console.error(error);
      toast.error("Eroare la încărcarea fișierului.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMedia = async (ids: string[]) => {
    if (!ids || !ids.length) {
      toast.error("Te rugăm să selectezi un fișier");
      return;
    }

    try {
      setIsLoading(true);
      const results: {id: string; status: "success" | "failed"; error?: string}[] = [];
      await Promise.all(
        ids.map(async (id) => {
          try {
            await deleteFromBucket(id);
            await deleteDbRecord.mutateAsync({id});
            results.push({id, status: "success"});
          } catch (deleteError) {
            if (deleteError instanceof Error) {
              results.push({id, status: "failed", error: deleteError.message});
            }
          }
        })
      );
      const successNumber = results.filter(({status}) => status === "success").length;

      if (ids.length === 1) {
        if (successNumber) {
          toast.success("Fișierul media a fost șters cu succes!");
        } else {
          toast.success("Fișierul media nu a putut fi șters.");
        }
      } else if (successNumber === 0) {
        toast.error(`Fișierele media nu au putut fi șterse.`);
      } else {
        toast.success(`Au fost șterse ${successNumber}/${ids.length} fișiere cu succes!`);
      }
    } catch (error) {
      console.error(error);
      toast.error("A apărut o eroare în ștergerea fișierelor.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isPending: isLoading || createDbRecord.isPending || deleteDbRecord.isPending,
    createMedia,
    deleteMedia,
  };
};
