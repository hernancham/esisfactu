"use client";

import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, Edit, Eye, EyeOff } from "lucide-react";

import { ResponsiveDialog } from "@/components/custom/ResposiveDialog";
import { FormUpdate } from "../Form/FormUpdate";
import { FormDelete } from "../Form/FormDelete";
import { Mesa } from "@prisma/client";

interface RowActionsProps {
  row: Mesa;
}

export const RowActions = ({ row }: RowActionsProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDisableOpen, setIsDisableOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title='Actualizar Producto'
        description='Complete el formulario para actualizar un producto'
      >
        <FormUpdate id={row.id} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDisableOpen}
        setIsOpen={setIsDisableOpen}
        title='Activar producto'
        description='Complete el formulario para activar el producto'
      >
        <FormDelete id={row.id} />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
          >
            <span className='sr-only'>Abrir Menu</span>
            <MoreHorizontal className='h-5 w-5 ' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className='cursor-pointer'
          >
            <Edit className='mr-2 h-4 w-4' />
            Actualizar
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsDisableOpen(true)}
            className='cursor-pointer'
          >
            <EyeOff className='mr-2 h-4 w-4' />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
