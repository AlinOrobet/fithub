"use client";
import Link from "next/link";
import {ChevronsRight, Loader2, LogOut, UserRound} from "lucide-react";

import {cn} from "@/lib/utils";
import {useAuthModal} from "@/modules/auth/hooks/use-auth-modal";
import {navigationGroups} from "@/modules/site/data";

import {FavoritesSheet} from "@/modules/site/favorites/ui/components/favorites-sheet";
import {CartSheet} from "@/modules/site/cart/ui/components/cart-sheet";
import {UserAvatar} from "@/components/user-avatar";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {trpc} from "@/trpc/client";

export const AuthButton = () => {
  return (
    <Suspense fallback={<AuthButtonSkeleton />}>
      <ErrorBoundary fallback={<AuthButtonError />}>
        <AuthButtonContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const AuthButtonError = () => {
  const {onOpen} = useAuthModal();
  return (
    <>
      <Button className="hidden md:inline h-9" onClick={() => onOpen("sign-up")}>
        Alătură-te acum!
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className={cn("md:hidden", false && "rounded-full")} asChild>
          <Button variant="outline" className="lg:hidden" size="icon">
            <UserRound className="size-4 lg:size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mt-1.5 min-w-60">
          <DropdownMenuGroup>
            <DropdownMenuLabel></DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <CartSheet triggerAsLabel />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <FavoritesSheet triggerAsLabel />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onOpen("sign-up")}>
              <ChevronsRight />
              Alătură-te acum!
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const AuthButtonSkeleton = () => {
  return (
    <>
      <Button className="hidden md:flex h-9 w-[134px] items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" />
      </Button>
      <Button variant="outline" className="md:hidden" size="icon">
        <Loader2 className="animate-spin text-muted-foreground" />
      </Button>
    </>
  );
};

const AuthButtonContent = () => {
  const [currentUser] = trpc.auth.getCurrentUser.useSuspenseQuery();
  const signOut = trpc.auth.signOut.useMutation({
    onSuccess: () => {
      utils.auth.getCurrentUser.invalidate();
    },
  });

  const utils = trpc.useUtils();

  console.log(currentUser);
  if (!currentUser) {
    return <AuthButtonError />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar imageUrl={currentUser.image} name={currentUser.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1.5 min-w-60">
        {navigationGroups.map((group, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuLabel>{group.name}</DropdownMenuLabel>
            {group.items.map(({label, icon: Icon, href}) => (
              <DropdownMenuItem key={label} asChild>
                <Link href={href}>
                  <Icon />
                  {label}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </DropdownMenuGroup>
        ))}
        <DropdownMenuItem onClick={async () => await signOut.mutateAsync()}>
          <LogOut />
          Deconectează-te
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
