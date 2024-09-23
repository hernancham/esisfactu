import { LucideIcon, Dot } from "lucide-react";

export interface Submenu {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
}

export interface Menu {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
}

export interface Group {
  groupLabel: string;
  menus: Menu[];
}

export type SiteMenu = Group[];

export const getSiteMenu = (sitemenu: SiteMenu, pathname: string) => {
  return sitemenu.map((group) => {
    return {
      groupLabel: group.groupLabel,
      menus: group.menus.map((menu) => {
        return {
          ...menu,
          active: pathname.includes(menu.href),
          submenus: menu.submenus.map((submenu) => {
            return {
              ...submenu,
              active: pathname.includes(submenu.href),
              icon: submenu.icon || Dot,
            };
          }),
        };
      }),
    };
  });
};
