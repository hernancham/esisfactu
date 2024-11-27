"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, LucideIcon, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { DashboardIcon } from "@radix-ui/react-icons";

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

interface UserNavProps {
  acount: Acount;
}

export function UserNav({ acount }: UserNavProps) {
  const { data, status } = useSession();

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
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='relative h-10 w-10 rounded-full'
              >
                <Avatar className='h-10 w-10'>
                  <AvatarImage
                    src={acount.user.avatar}
                    alt='Avatar'
                  />
                  <AvatarFallback className='bg-transparent'>HC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>{acount.user.role}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {acount.user.name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {acount.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {acount.user.role === UserRole.Admin ? (
          <Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className='flex items-center'
            >
              <Link href='/dashboard'>
                <DashboardIcon />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </Fragment>
        ) : null}
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
  );
}
