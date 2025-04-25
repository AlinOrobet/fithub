import {useMedia} from "react-use";

import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Drawer, DrawerContent} from "@/components/ui/drawer";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

interface ResponsiveModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export const ResponsiveModal = ({children, isOpen, onOpenChange}: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width:640px)", true);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 sm:px-0  overflow-y-auto hide-scrollbar max-h-[85vh]">
          <VisuallyHidden>
            <DialogTitle></DialogTitle>
          </VisuallyHidden>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="border-none">
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
