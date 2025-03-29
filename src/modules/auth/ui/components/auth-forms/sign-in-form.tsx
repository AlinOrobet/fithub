"use client";

import {z} from "zod";
import {Suspense, useState} from "react";
import {useForm} from "react-hook-form";
import {ErrorBoundary} from "react-error-boundary";
import {Eye, EyeOff, Loader2} from "lucide-react";

import {trpc} from "@/trpc/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInSchema} from "@/modules/auth/schemas";
import {useAuthModal} from "@/modules/auth/hooks/use-auth-modal";

import {AuthLayout} from "@/modules/auth/ui/layouts/auth-layout";
import {ErrorState} from "@/modules/auth/ui/components/auth-forms/error-state";
import {AuthSocials, AuthSocialsSkeleton} from "@/modules/auth/ui/components/auth-socials";
import {ErrorContent} from "@/modules/auth/ui/components/error-content";

import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export const SignInForm = () => {
  return (
    <Suspense fallback={<SignInSkeleton />}>
      <ErrorBoundary fallback={<ErrorState stack="sign-in" />}>
        <SignInContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const SignInSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input disabled />
        </div>
        <div className="space-y-1.5">
          <Label className="flex flex-row items-center justify-between">
            Parolă <span className="text-sm">Ai uitat parola?</span>
          </Label>
          <Input disabled />
        </div>
      </div>
      <Button className="w-full" variant="secondary" disabled>
        <Loader2 className="animate-spin" />
      </Button>
      <AuthSocialsSkeleton />
    </div>
  );
};

const SignInContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {isOpen, onOpen, onClose} = useAuthModal();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const utils = trpc.useUtils();

  const action = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      utils.auth.getCurrentUser.invalidate();
      form.reset();
      onClose();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await action.mutateAsync(data);
  };

  const isPending = action.isPending;

  return (
    <AuthLayout type="sign-in" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto px-0.5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Introdu emailul tău" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="flex flex-row items-center justify-between w-full">
                    Parolă
                    <Button
                      type="button"
                      variant="link"
                      className="text-white text-sm p-0 h-auto"
                      onClick={() => onOpen("forgot-password")}
                      disabled={isPending}
                    >
                      Ai uitat parola?
                    </Button>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Introdu parola ta"
                        className="pr-10"
                        disabled={isPending}
                      />
                      <div
                        className="absolute top-0.5 right-0 h-8 w-9 flex justify-center items-center border-l cursor-pointer hover:bg-muted/20 "
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ErrorContent message={error} />
          <Button type="submit" className="w-full" variant="secondary" disabled={isPending}>
            Autentificare
          </Button>
          <AuthSocials disabled={isPending} />
        </form>
      </Form>
    </AuthLayout>
  );
};
