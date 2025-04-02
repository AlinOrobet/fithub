import {useState, JSX} from "react";

import {Button, type ButtonProps} from "@/components/ui/button";
import {ResponsiveModal} from "@/components/responsive-modal";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export const useConfirm = (
  title: string,
  message: string,
  variant: ButtonProps["variant"] = "default"
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{resolve: (value: boolean) => void} | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({resolve});
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveModal isOpen={promise !== null} onOpenChange={handleClose}>
        <Card className="w-full h-full border-none shadow-none p-6">
          <CardContent className="p-0 space-y-4">
            <CardHeader className="p-0">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <div className="w-full flex flex-col-reverse sm:flex-row justify-end items-center gap-2">
              <Button onClick={handleCancel} variant="ghost" className="w-full sm:w-auto" size="lg">
                Anulează
              </Button>
              <Button
                onClick={handleConfirm}
                variant={variant}
                className="w-full sm:w-auto"
                size="lg"
              >
                Confirmă
              </Button>
            </div>
          </CardContent>
        </Card>
      </ResponsiveModal>
    );
  };

  return [ConfirmationDialog, confirm];
};
