import {Suspense} from "react";
import {SyncLoader} from "react-spinners";

import {useDialog} from "@/modules/admin/hooks/use-dialog";

import {cn} from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {CreateImageForm} from "@/modules/admin/(media)/images/ui/create-image-form";

export const DialogProvider = () => {
  const {dialogId, removeDialog} = useDialog();

  if (!dialogId) {
    return null;
  }

  const handleOnClose = () => {
    removeDialog();
  };

  const DIALOG_COMPONENTS = {
    "create-image": {
      header: <DialogTitle className="text-left">Adaugă imagine</DialogTitle>,
      body: <CreateImageForm onClose={handleOnClose} />,
      footer: undefined,
      headerClassName: undefined,
    },
  };

  const dialog = DIALOG_COMPONENTS[dialogId as keyof typeof DIALOG_COMPONENTS];

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex justify-center items-center">
          <SyncLoader color="white" />
        </div>
      }
    >
      <Dialog
        open
        onOpenChange={() => {
          handleOnClose();
        }}
      >
        <DialogContent className="w-[90%] xs:max-w-[500px] rounded-md">
          <DialogHeader className={cn(dialog?.headerClassName)}>{dialog.header}</DialogHeader>
          {dialog.body}
          {dialog.footer && <DialogFooter>{dialog.footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    </Suspense>
  );
};
