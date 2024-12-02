import {
  Table,
  Utensils,
  Layers,
  ClipboardList,
  FileText,
  User,
  LayoutDashboard,
  Settings,
  DollarSign,
} from "lucide-react";

export const navMenu = [
  {
    label: "Administración",
    hidden: false,
    items: [
      {
        title: "Panel de Control",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Resumen",
            url: "/dashboard/resumen",
          },
          {
            title: "Reportes",
            url: "/dashboard/reportes",
          },
        ],
      },
      {
        title: "Mesas",
        icon: Table,
        items: [
          {
            title: "Lista de Mesas",
            url: "/mesas",
          },
          {
            title: "Disponibles",
            url: "/mesas/disponibles",
          },
          {
            title: "Ocupadas",
            url: "/mesas/ocupadas",
          },
        ],
      },
      {
        title: "Productos",
        icon: Utensils,
        items: [
          {
            title: "Lista de Productos",
            url: "/productos/lista",
          },
          {
            title: "Categorías de Productos",
            url: "/productos/categorias",
            icon: Layers,
          },
        ],
      },
      {
        title: "Gestión de Pedidos",
        icon: ClipboardList,
        items: [
          {
            title: "Pedidos Activos",
            url: "/pedidos/activos",
          },
          {
            title: "Historial de Pedidos",
            url: "/pedidos/historial",
          },
        ],
      },
      {
        title: "Gestión de Ventas",
        icon: DollarSign,
        items: [
          {
            title: "Registrar Venta",
            url: "/ventas/nueva",
          },
          {
            title: "Historial de Ventas",
            url: "/ventas/historial",
          },
        ],
      },
      {
        title: "Gestión de Facturas",
        icon: FileText,
        items: [
          {
            title: "Facturas Emitidas",
            url: "/facturas/emitidas",
          },
          {
            title: "Facturas Pendientes",
            url: "/facturas/pendientes",
          },
        ],
      },
      {
        title: "Gestión de Empleados",
        icon: User,
        items: [
          {
            title: "Lista de Empleados",
            url: "/empleados/lista",
          },
          {
            title: "Roles y Permisos",
            url: "/empleados/roles",
          },
        ],
      },
      {
        title: "Configuraciones",
        icon: Settings,
        items: [
          {
            title: "Preferencias Generales",
            url: "/configuraciones/general",
          },
          {
            title: "Usuarios y Accesos",
            url: "/configuraciones/usuarios",
          },
        ],
      },
    ],
  },
];
