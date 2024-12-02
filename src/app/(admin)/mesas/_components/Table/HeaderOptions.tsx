"use client";

import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronsUpDownIcon,
  EyeOffIcon,
} from "lucide-react";

const outlineclasses ="border border-graphite-dark dark:border-green_p-light bg-graphite-dark text-green_p-light dark:bg-green_p-light dark:text-graphite-deep hover:bg-graphite-deep hover:text-green_p-light dark:hover:bg-green_p-dark";

interface HeaderOptionsProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

export function HeaderOptions<TData, TValue>({
  column,
  title,
  className,
}: HeaderOptionsProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:${outlineclasses}'
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ChevronDownIcon className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUpIcon className='ml-2 h-4 w-4' />
            ) : (
              <ChevronsUpDownIcon className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ChevronUpIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ChevronDownIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
