import {
  Bell,
  BicepsFlexed,
  BookOpen,
  ChartColumn,
  Dumbbell,
  FileText,
  Images,
  MessageCircle,
  MessageCircleQuestion,
  PackageOpen,
  Salad,
  Shapes,
  Shirt,
  Users,
  Vegan,
  VideoIcon,
} from "lucide-react";

export const sidebarGroups = [
  {
    label: "Analiză",
    items: [
      {label: "Statistici", href: "/admin", icon: ChartColumn},
      {label: "Clienți", href: "/admin/clients", icon: Users},
      {label: "Testimoniale", href: "/admin/testimonials", icon: MessageCircle},
    ],
  },
  {
    label: "Conținut",
    items: [
      {label: "Anunțuri", href: "/admin/announcements", icon: Bell},
      {label: "Pagini", href: "/admin/pages", icon: BookOpen},
      {label: "Pachete", href: "/admin/bundles", icon: PackageOpen},
      {label: "Chestionare", href: "/admin/questionnaires", icon: MessageCircleQuestion},
      {label: "Documente", href: "/admin/documents", icon: FileText},
    ],
  },
  {
    label: "Antrenamente",
    items: [
      {label: "Programe", href: "/admin/programs", icon: BicepsFlexed},
      {label: "Exerciții", href: "/admin/exercises", icon: Dumbbell},
    ],
  },
  {
    label: "Diete",
    items: [
      {label: "Planuri alimentare", href: "/admin/diets", icon: Vegan},
      {label: "Meniu", href: "/admin/menus", icon: Salad},
    ],
  },
  {
    label: "Magazin",
    items: [
      {label: "Produse", href: "/admin/products", icon: Shirt},
      {label: "Filtre", href: "/admin/filters", icon: Shapes},
    ],
  },
  {
    label: "Media",
    items: [
      {label: "Imagini", href: "/admin/images", icon: Images},
      {label: "Videoclipuri", href: "/admin/videos", icon: VideoIcon},
    ],
  },
];
