"use client";

import {z} from "zod";
import {Suspense, useState} from "react";
import {useForm} from "react-hook-form";
import {ErrorBoundary} from "react-error-boundary";
import {Eye, EyeOff, Loader2} from "lucide-react";

import {trpc} from "@/trpc/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUpSchema} from "@/modules/auth/schemas";
import {useAuthModal} from "@/modules/auth/hooks/use-auth-modal";

import {AuthLayout} from "@/modules/auth/ui/layouts/auth-layout";
import {ErrorState} from "@/modules/auth/ui/components/auth-forms/error-state";
import {AuthSocials, AuthSocialsSkeleton} from "@/modules/auth/ui/components/auth-socials";
import {ErrorContent} from "@/modules/auth/ui/components/error-content";

import {Form, FormControl, FormField, FormLabel, FormMessage, FormItem} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export const SignUpForm = () => {
  return (
    <Suspense fallback={<SignUpSkeleton />}>
      <ErrorBoundary fallback={<ErrorState stack="sign-up" />}>
        <SignUpContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const SignUpSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input disabled />
        </div>
        <div className="space-y-1.5">
          <Label>Parolă</Label>
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

const SignUpContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const {isOpen, onOpen, onClose} = useAuthModal();

  const action = trpc.auth.signUp.useMutation({
    onSuccess: () => {
      form.reset();
      onOpen("sign-in");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await action.mutateAsync(data);
  };

  const isPending = action.isPending;

  return (
    <AuthLayout type="sign-up" isOpen={isOpen} onClose={onClose}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto px-0.5">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nume</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Introdu numele tău" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            Înregistrare
          </Button>
          <AuthSocials disabled={isPending} />
        </form>
      </Form>
    </AuthLayout>
  );
};
