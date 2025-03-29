import {AUTH_ERRORS_CONTENT, AUTH_MODALS_CONTENT} from "@/modules/auth/types";

export const authModalContent: AUTH_MODALS_CONTENT[] = [
  {
    type: "sign-in",
    title: "Bine ai revenit!",
    description: "Conectează-te și continuă-ți progresul!",
    prompt: "Nu ai încă un cont ?",
    action: "Creează unul.",
    navigateTo: "sign-up",
  },
  {
    type: "sign-up",
    title: "Alătură-te comunității!",
    description: "Creează-ți contul și începe-ți călătoria spre un stil de viață activ!",
    prompt: "Ai deja un cont ?",
    action: "Autentifică-te.",
    navigateTo: "sign-in",
  },
  {
    type: "forgot-password",
    title: "Ai uitat parola?",
    description: "Nu-i nimic! Introdu emailul și îți trimitem instrucțiunile de resetare.",
    prompt: "Ți-ai amintit parola ?",
    action: "Autentifică-te.",
    navigateTo: "sign-in",
  },
];

export const authErrors: AUTH_ERRORS_CONTENT[] = [
  {type: "", description: "", action: "", navigateTo: "sign-up"},
];
