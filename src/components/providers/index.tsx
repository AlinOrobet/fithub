"use client";
import {Toaster} from "sonner";
import {AdminProviders} from "@/modules/admin/providers";
import {AuthProvider} from "@/modules/auth/ui/providers";

export const Providers = () => {
  return (
    <>
      <Toaster position="top-left" />
      <AuthProvider />
      <AdminProviders />
    </>
  );
};
