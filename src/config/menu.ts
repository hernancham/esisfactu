import { type SiteMenu } from "@/lib/site-menu";

import {
  Home,
  Info,
  Mail,
  Package,
  List,
  ShoppingCart,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";

export const siteMenu: SiteMenu = [
  {
    groupLabel: "Principal",
    menus: [
      {
        href: "/",
        label: "Inicio",
        icon: Home,
        submenus: [],
      },
      {
        href: "/nosotros",
        label: "Nosotros",
        icon: Info,
        submenus: [],
      },
      {
        href: "/contacto",
        label: "Contacto",
        icon: Mail,
        submenus: [],
      },
    ],
  },
  {
    groupLabel: "Productos",
    menus: [
      {
        href: "/productos",
        label: "Productos",
        icon: Package,
        submenus: [
          {
            href: "/productos/1",
            label: "Producto 1",
            icon: Package,
          },
          {
            href: "/productos/2",
            label: "Producto 2",
            icon: Package,
          },
          {
            href: "/productos/3",
            label: "Producto 3",
            icon: Package,
          },
        ],
      },
      {
        href: "/categorias",
        label: "Categorias",
        icon: List,
        submenus: [],
      },
    ],
  },
  {
    groupLabel: "Cuenta",
    menus: [
      {
        href: "/carrito",
        label: "Carrito",
        icon: ShoppingCart,
        submenus: [],
      },
      {
        href: "/perfil",
        label: "Perfil",
        icon: User,
        submenus: [],
      },
      {
        href: "/login",
        label: "Iniciar Sesión",
        icon: LogIn,
        submenus: [],
      },
      {
        href: "/registro",
        label: "Registrarse",
        icon: UserPlus,
        submenus: [],
      },
    ],
  },
];
