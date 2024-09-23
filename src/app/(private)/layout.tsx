"use client";

import { Navbar } from "@/components/custom/navbar";
import { Sidebar } from "@/components/custom/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  return (
    <section className='min-h-full'>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Navbar />
        {children}
      </main>
    </section>
  );
}
