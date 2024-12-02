"use client";

import { LucideIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavOption = {
  label: string;
  hidden: boolean;
  items: NavOptionItem[];
};

type NavOptionItem = {
  name: string;
  url: string;
  icon: LucideIcon;
  options?: Option;
};

type Option = {
  name: string;
  icon: LucideIcon;
  action: () => void;
}[];

interface SidebarNavOptionsProps {
  navOptions: NavOption[];
}

export const SidebarNavOptions = ({ navOptions }: SidebarNavOptionsProps) => {
  return (
    <>
      {navOptions.map((group) => (
        <SidebarGroup
          key={group.label}
          className={group.hidden ? "group-data-[collapsible=icon]:hidden" : ""}
        >
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </a>
                </SidebarMenuButton>
                {item.options && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className='sr-only'>Opciones</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className='w-48 rounded-lg'
                      side='bottom'
                      align='end'
                    >
                      {item.options.map((option) => (
                        <DropdownMenuItem
                          key={option.name}
                          onClick={option.action}
                        >
                          <option.icon className='text-muted-foreground' />
                          <span>{option.name}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </SidebarMenuItem>
            ))}
            {/* <SidebarMenuItem>
              <SidebarMenuButton className='text-sidebar-foreground/70'>
                <MoreHorizontal className='text-sidebar-foreground/70' />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
};
