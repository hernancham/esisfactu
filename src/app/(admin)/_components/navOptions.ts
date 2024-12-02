import { Folder, Forward, Trash2, Frame, PieChart } from "lucide-react";

export const options = [
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

export const navOptions = [
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
