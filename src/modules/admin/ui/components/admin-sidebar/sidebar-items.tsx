"use client";

import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export const SidebarItems = () => {
  const pathname = usePathname();

  const defineIfIsActive = (href: string) => {
    if (pathname === href && href === "/admin") {
      return true;
    }

    if (pathname.startsWith(href) && href !== "/admin") {
      return true;
    }

    return false;
  };

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label} className="border-b last:border-0">
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-base font-semibold">{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem
                  key={item.label}
                  className={cn(
                    defineIfIsActive(item.href) && "text-white bg-muted/20 border-r-2 border-white"
                  )}
                >
                  <SidebarMenuButton
                    tooltip={item.label}
                    asChild
                    isActive={pathname.startsWith(item.href)}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

const groups = [
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
      {label: "Pagini", href: "/admin/pages", icon: BookOpen},
      {label: "Documente", href: "/admin/documents", icon: FileText},
      {label: "Anunțuri", href: "/admin/announcements", icon: Bell},
      {label: "Pachete", href: "/admin/bundles", icon: PackageOpen},
      {label: "Chestionare", href: "/admin/questionnaires", icon: MessageCircleQuestion},
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
