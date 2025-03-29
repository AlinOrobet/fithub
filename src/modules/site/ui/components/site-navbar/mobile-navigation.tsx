"use client";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {MenuIcon} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

import {useIsMobile} from "@/hooks/use-mobile";

import {Logo} from "@/components/logo";
import {Routes} from "@/modules/site/ui/components/site-navbar/routes";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";

export const MobileNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden" size="icon">
          <MenuIcon className="size-4 lg:size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 overflow-y-auto" aria-describedby={undefined}>
        <VisuallyHidden>
          <SheetTitle />
        </VisuallyHidden>
        <div className="flex items-center justify-center p-4">
          <Logo href="/" className="h-20 w-40" />
        </div>
        <div className="p-4 pt-0">
          <Routes />
        </div>
      </SheetContent>
    </Sheet>
  );
};
