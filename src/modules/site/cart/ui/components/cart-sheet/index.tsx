"use client";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {ShoppingBasket} from "lucide-react";

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

import {cn} from "@/lib/utils";

interface CartSheetProps {
  triggerAsLabel?: boolean;
}

export const CartSheet = ({triggerAsLabel = false}: CartSheetProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {triggerAsLabel ? (
          <DropdownMenuItem>
            <ShoppingBasket />
            Coșul meu
          </DropdownMenuItem>
        ) : (
          <Button variant="outline" size="icon" className="relative">
            <div
              className={cn(
                "absolute rounded-full text-xs flex items-center justify-center",

                true
                  ? "bg-rose-700 w-4 h-4 -top-1.5 -right-1.5 animate-pulse"
                  : true
                  ? "bg-background w-4 h-4 -top-1.5 -right-1.5 "
                  : null
              )}
            >
              {/* {items.length < 9 && items.length ? items.length : null} */}1
            </div>
            <ShoppingBasket className="size-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="p-0 flex flex-col">
        <SheetHeader className="flex items-center justify-center p-6 border-b h-28">
          <SheetTitle>Coșul tău de cumpărături</SheetTitle>
          <SheetDescription>(3 produse)</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4">
          {/* {items.length ? (
            <div className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <ProductCard key={index} data={item} small checkout />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={ShoppingBasket}
              href="/"
              title="Coșul tău așteaptă să fie umplut!"
              description="Nu ai adăugat niciun produs în coș. Răsfoiește catalogul nostru și găsește-ți produsele preferate!"
              buttonName="Descoperă toate produsele"
              onClose={() => setIsOpen(false)}
            />
          )} */}
        </div>
        {/* {!!items.length && (
          <SheetFooter className="flex flex-col sm:flex-col border-t gap-y-3 p-4">
            <h3 className="mt-0">Sumar comandă</h3>
            <PricingStats
              prices={items.map((item) => ({
                price: item.price,
                quantity: item.quantity || 1,
              }))}
            />
            <Button className="w-full" size="lg" onClick={() => setIsOpenDialog(true)}>
              Continuă
            </Button>
          </SheetFooter>
        )} */}
      </SheetContent>
    </Sheet>
  );
};
