import {z} from "zod";

export const signInSchema = z.object({
  email: z.string().email("Te rugăm să introduci un email valid."),
  password: z.string().min(6, "Parola trebuie să aibă cel puțin 6 caractere."),
});

export const signUpSchema = z.object({
  name: z.string().min(2, "Numele trebuie să aibă cel puțin 2 caractere."),
  email: z.string().email("Te rugăm să introduci un email valid."),
  password: z.string().min(6, "Parola trebuie să aibă cel puțin 6 caractere."),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Te rugăm să introduci un email valid."),
});
