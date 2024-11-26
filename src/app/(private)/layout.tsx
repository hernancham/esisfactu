import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/AdminSiderbar";
import { AdminNavbar } from "./_components/AdminNavbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminNavbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
