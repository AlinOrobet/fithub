import {AUTH_TYPE} from "@/modules/auth/types";
import {authModalContent} from "@/modules/auth/data";

import {AuthSwitcher} from "@/modules/auth/ui/components/auth-switcher";
import {Logo} from "@/components/logo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthLayoutProps {
  type: AUTH_TYPE;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
}

export const AuthLayout = ({type, children, isOpen, onClose}: AuthLayoutProps) => {
  const {title, description, prompt, action, navigateTo} = authModalContent.find(
    (item) => item.type === type
  )!;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col p-0 gap-0 max-w-md">
        <div className="flex flex-col p-8 pb-6 space-y-6 max-h-[80vh]">
          <DialogHeader className="flex flex-col items-center">
            <Logo href="/" className="h-16 w-32" />
            <DialogTitle className="text-center text-xl font-roboto font-medium">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center">{description}</DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
        <DialogFooter className="flex items-center sm:justify-center bg-muted/40 p-3 m-0.5 border border-muted rounded-md">
          <DialogDescription className="text-white font-thin">
            {prompt}{" "}
            <AuthSwitcher navigateTo={navigateTo} className="underline font-medium">
              {action}
            </AuthSwitcher>
          </DialogDescription>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
