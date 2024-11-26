"use client";

import { useState } from "react";
import { ShoppingCart as ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function ShoppingCart() {
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
          className='text-lime-600 hover:text-orange-500 hover:bg-lime-100 rounded-full'
        >
          <ShoppingCartIcon className='h-5 w-5' />
          <span className='sr-only'>Carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>
        <div className='mt-4'>
          {/* Aquí iría el contenido del carrito */}
          <p>Tu carrito está vacío.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
