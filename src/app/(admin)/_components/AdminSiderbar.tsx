"use client";

import {
  BadgeCheck,
  Bell,
  CreditCard,
  Folder,
  Forward,
  Frame,
  LogOut,
  Map,
  PieChart,
  Trash2,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import { EsisfactuIcon } from "@/components/logos/EsisfactuIcon";

import { SidebarAcount } from "./SidebarAcount";
import { SidebarEnterprise } from "./SidebarEnterprise";
import { SidebarNavMenu } from "./SidebarNavMenu";
import { SidebarNavOptions } from "./SidebarNavOptions";

import { navMenu } from "./navMenu";
import { navOptions } from "./navOptions";

const teams = [
  {
    name: "Esisfactu",
    logo: EsisfactuIcon,
    descripcion: "Panel de Administración",
  },
];

const acount = {
  user: {
    id: "12345678",
    name: "Nombre de Usuario",
    email: "Correo Electrónico",
    avatar: "/assets/user.svg",
    role: "Admin",
  },
  options: [
    {
      title: "Cuenta",
      items: [
        {
          name: "Mi cuenta",
          icon: BadgeCheck,
          url: "/mi-cuenta",
        },
        {
          name: "Pagos",
          icon: CreditCard,
          url: "/pagos",
        },
        {
          name: "Notificaciones",
          icon: Bell,
          url: "/notificaciones",
        },
      ],
    },
    {
      title: "Salida",
      items: [
        {
          name: "Salir",
          icon: LogOut,
          url: "/logout",
        },
      ],
    },
  ],
};

export const AdminSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarEnterprise teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMenu navMenu={navMenu} />
        {/* <SidebarNavOptions navOptions={navOptions} /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarAcount acount={acount} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
