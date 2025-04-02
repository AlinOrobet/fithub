"use client";
import {usePathname} from "next/navigation";
import Link from "next/link";

import {sidebarGroups} from "@/modules/admin/data";
import {cn} from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
      {sidebarGroups.map((group) => (
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
