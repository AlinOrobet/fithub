import {Bell, InfoIcon, Receipt, ScrollText, Settings, UserPen} from "lucide-react";
export const navigationGroups = [
  {
    name: "Contul meu",
    items: [
      {label: "Anunțuri", icon: Bell, href: "/profil/anunturi"},
      {label: "Profil", icon: UserPen, href: "/profil"},
      {label: "Subscripții", icon: Receipt, href: "/profil/subscriptii"},
      {label: "Ajutor", icon: InfoIcon, href: "/ajutor"},
      {label: "Informații utile", icon: ScrollText, href: "/informatii-utile"},
      {label: "Setări", icon: Settings, href: "/profil/setari"},
    ],
  },
];

export const navigationRoutes = [
  {
    label: "Antrenamente",
    href: "/antrenamente",
  },
  {
    label: "Diete",
    href: "/diete",
  },
  {label: "Magazin", href: "/magazin"},
];
