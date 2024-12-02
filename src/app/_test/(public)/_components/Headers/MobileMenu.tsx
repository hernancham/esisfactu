"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden text-lime-600 hover:text-orange-500 hover:bg-green-100 rounded-full'
        >
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <nav className='flex flex-col space-y-4 mt-4'>
          <NavLinks />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
