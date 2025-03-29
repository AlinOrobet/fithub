"use client";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {Heart} from "lucide-react";

import {Button} from "@/components/ui/button";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FavoritesSheetProps {
  triggerAsLabel?: boolean;
}

export const FavoritesSheet = ({triggerAsLabel = false}: FavoritesSheetProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  // const {items} = useFavorites();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {triggerAsLabel ? (
          <DropdownMenuItem>
            <Heart />
            Favoritele mele
          </DropdownMenuItem>
        ) : (
          <Button variant="outline" size="icon">
            <Heart className="size-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="p-0 flex flex-col">
        <SheetHeader className="flex items-center justify-center p-6 border-b h-28">
          <SheetTitle>Favoritele tale</SheetTitle>
          <SheetDescription>(3 produse)</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {/* {items.length ? (
            <div className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <ProductCard key={index} data={item} small />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Heart}
              href="/"
              title="Produsele tale preferate"
              description="Ce produs te definește? Ce anume ai descoperit cel mai recent și a devenit favoritul tău? Am creat acest loc special pentru el."
              buttonName="Descoperă toate produsele"
              onClose={() => setIsOpen(false)}
            />
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
};
