"use client";

import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  CreditCard,
  Folder,
  Forward,
  Frame,
  LogOut,
  Map,
  PieChart,
  Settings2,
  Sparkles,
  SquareTerminal,
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

const navMenu = [
  {
    label: "Platform",
    hidden: false,
    items: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Configuraciones",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  },
];

const options = [
  {
    name: "View Project",
    icon: Folder,
    action: () => {
      console.log("View Project");
    },
  },
  {
    name: "Share Project",
    icon: Forward,
    action: () => {},
  },
  {
    name: "Delete Project",
    icon: Trash2,
    action: () => {},
  },
];

const navOptions = [
  {
    label: "Proyectos",
    hidden: false,
    items: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
        options: options,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
        options: options,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
        options: options,
      },
    ],
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
      title: "Actualiza Plan",
      items: [
        {
          name: "Actualiza a Pro",
          icon: Sparkles,
          url: "/planes",
        },
      ],
    },
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

interface RestauranteSidebarProps {
  empresa: string;
}

export const RestauranteSidebar = ({ empresa }: RestauranteSidebarProps) => {
  const teams = [
    {
      name: empresa,
      logo: EsisfactuIcon,
      descripcion: "Panel de Administración",
    },
  ];

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarEnterprise teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavMenu navMenu={navMenu} />
        <SidebarNavOptions navOptions={navOptions} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarAcount acount={acount} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
