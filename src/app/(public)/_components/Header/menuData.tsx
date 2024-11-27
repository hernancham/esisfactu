import { Menu } from "@/types/menu";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin", path: "/admin" },
  { name: "Nosotros", path: "/sobre-nosotros" },
  { name: "FAQ", path: "/preguntas-frecuentes" },
  { name: "Mi cuenta", path: "/mi-cuenta" },
];

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Nosotros",
    newTab: false,
    path: "/#features",
  },
  {
    id: 2.1,
    title: "Preguntas Frecuentes",
    newTab: false,
    path: "#FAQ",
  },
  {
    id: 3,
    title: "Precio",
    newTab: false,
    path: "#pricing",
  },
  {
    id: 4,
    title: "Soporte",
    newTab: false,
    path: "#support",
  },
];

export default menuData;
