import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RestauranteSidebar } from "./_components/RestauranteSiderbar";
import { RestauranteNavbar } from "./_components/RestauranteNavbar";
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ empresa: string }>;
}) {
  const empresa = (await params).empresa;
  return (
    <SidebarProvider>
      <RestauranteSidebar empresa={empresa} />
      <SidebarInset>
        <RestauranteNavbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
