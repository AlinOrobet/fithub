import {Suspense} from "react";
import {SyncLoader} from "react-spinners";

import {useSheet} from "@/modules/admin/hooks/use-sheet";

import {cn} from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const SheetProvider = () => {
  const {sheetId, removeSheet} = useSheet();

  if (!sheetId) {
    return null;
  }

  const handleOnClose = () => {
    removeSheet();
  };

  const SHEET_COMPONENTS = {
    "user-favorite-list": {
      header: (
        <>
          <SheetTitle>Favoritele clientului</SheetTitle>
          <SheetDescription>description</SheetDescription>
        </>
      ),
      body: <></>,
      footer: undefined,
      headerClassName: undefined,
    },
    "user-cart-list": {
      header: (
        <>
          <SheetTitle>Coșul clientului</SheetTitle>
          <SheetDescription>description</SheetDescription>
        </>
      ),
      body: <></>,
      footer: undefined,
      headerClassName: undefined,
    },
    "user-course-list": {
      header: (
        <>
          <SheetTitle>Cursurile clientului</SheetTitle>
          <SheetDescription>description</SheetDescription>
        </>
      ),
      body: <></>,
      footer: undefined,
      headerClassName: undefined,
    },
  };

  const sheet = SHEET_COMPONENTS[sheetId];

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 flex justify-center items-center">
          <SyncLoader color="white" />
        </div>
      }
    >
      <Sheet
        open
        onOpenChange={() => {
          handleOnClose();
        }}
      >
        <SheetContent className="w-[90%] xs:max-w-[500px] rounded-md">
          <SheetHeader className={cn(sheet?.headerClassName)}>{sheet.header}</SheetHeader>
          {sheet.body}
          {sheet.footer && <SheetFooter>{sheet.footer}</SheetFooter>}
        </SheetContent>
      </Sheet>
    </Suspense>
  );
};
