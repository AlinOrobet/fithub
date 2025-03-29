import {useAuthModal} from "@/modules/auth/hooks/use-auth-modal";

import {SignUpForm} from "@/modules/auth/ui/components/auth-forms/sign-up-form";
import {SignInForm} from "@/modules/auth/ui/components/auth-forms/sign-in-form";
import {ForgotPasswordForm} from "@/modules/auth/ui/components/auth-forms/forgot-password";

export const AuthProvider = () => {
  const {id} = useAuthModal();

  if (!id) {
    return null;
  }

  return (
    <>
      {id === "sign-in" && <SignInForm />}
      {id === "sign-up" && <SignUpForm />}
      {id === "forgot-password" && <ForgotPasswordForm />}
    </>
  );
};
