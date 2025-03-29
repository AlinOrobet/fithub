import {useState} from "react";
import {Frown} from "lucide-react";

import {AUTH_TYPE} from "@/modules/auth/types";

import {AuthSwitcher} from "@/modules/auth/ui/components/auth-switcher";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

interface ErrorStateProps {
  stack: AUTH_TYPE;
}

export const ErrorState = ({stack}: ErrorStateProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader className="flex justify-center items-center">
          <div className="flex items-center justify-center size-20 rounded-full border bg-muted/30">
            <Frown className="size-12 text-muted-foreground" />
          </div>
        </DialogHeader>
        <div className="space-y-2">
          <DialogTitle className="text-center">A intervenit o problemă</DialogTitle>
          <DialogDescription className="text-center">
            A intervenit o problemă tehnică neașteptată. Vă rugăm să reîncercați mai târziu. Dacă
            eroarea persistă, contactați suportul tehnic pentru asistență suplimentară.
          </DialogDescription>
        </div>
        <DialogFooter className="mt-2">
          <Button asChild>
            <AuthSwitcher navigateTo={stack}>Reîncearcă</AuthSwitcher>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
