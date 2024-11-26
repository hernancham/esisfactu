"use client";

import { ChevronsUpDown, LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Fragment } from "react";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string | UserRole;
};

type Option = {
  title: string;
  items: OptionItem[];
};

type OptionItem = {
  name: string;
  icon: LucideIcon;
  url: string;
};

type Acount = {
  user: User;
  options: Option[];
};

interface SidebarAcountProps {
  acount: Acount;
}

export const SidebarAcount = ({ acount }: SidebarAcountProps) => {
  const { data, status, update } = useSession();

  if (status === "authenticated") {
    acount.user = {
      id: data.user.id as string,
      name: data.user.name as string,
      email: data.user.email as string,
      avatar: data.user.image ?? acount.user.avatar,
      role: data.user.rol,
    };
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={acount.user.avatar}
                  alt={acount.user.name}
                />
                <AvatarFallback className='rounded-lg'>HC</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {acount.user.name}
                </span>
                <span className='truncate text-xs'>{acount.user.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side='bottom'
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={acount.user.avatar}
                    alt={acount.user.name}
                  />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {acount.user.name}
                  </span>
                  <span className='truncate text-xs'>{acount.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            {acount.options.map((group) => (
              <Fragment key={group.title}>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      asChild
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
