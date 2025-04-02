"use client";
import {AdminProviders} from "@/modules/admin/providers";
import {AuthProvider} from "@/modules/auth/ui/providers";

export const Providers = () => {
  return (
    <>
      <AuthProvider />
      <AdminProviders />
    </>
  );
};
