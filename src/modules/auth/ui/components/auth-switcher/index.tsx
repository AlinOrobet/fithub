"use client";

import {AUTH_TYPE} from "@/modules/auth/types";
import {useAuthModal} from "@/modules/auth/hooks/use-auth-modal";

import {cn} from "@/lib/utils";

interface AuthSwitcherProps {
  children: React.ReactNode;
  navigateTo: AUTH_TYPE;
  className?: string;
}

export const AuthSwitcher = ({children, navigateTo, className}: AuthSwitcherProps) => {
  const {onOpen} = useAuthModal();
  return (
    <span className={cn("cursor-pointer", className)} onClick={() => onOpen(navigateTo)}>
      {children}
    </span>
  );
};
