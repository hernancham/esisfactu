"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin", path: "/admin" },
  { name: "Nosotros", path: "/sobre-nosotros" },
  { name: "FAQ", path: "/preguntas-frecuentes" },
  { name: "Mi cuenta", path: "/mi-cuenta" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className='hidden md:ml-6 md:flex items-center'>
      <ul className='flex items-center space-x-4'>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`text-lime-600 hover:text-orange-500 transition-colors ${
              pathname === item.path ? "font-bold text-orange-500" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
