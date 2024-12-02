"use client";

import { ColumnDef } from "@tanstack/react-table";
// Types
import { HeaderOptions } from "./HeaderOptions";

import { RowActions } from "./RowActions";
import { EstadoMesa, Mesa } from "@prisma/client";

export const ColMesas: ColumnDef<Mesa>[] = [
  {
    id: "Imagen",
    accessorKey: "id",
    header: "Imagen",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <div className='flex items-center justify-center h-10 w-10'>
          <img
            src='/resource/mesa.png'
            alt={id.toString()}
            width={40}
            height={40}
            className='rounded-full'
          />
        </div>
      );
    },
  },
  {
    accessorKey: "codigoMesa",
    header: ({ column }) => (
      <HeaderOptions
        column={column}
        title='Codigo Mesa'
      />
    ),
  },
  {
    id: "Estado",
    accessorKey: "estado",
    header: ({ column }) => (
      <HeaderOptions
        column={column}
        title='Estado'
      />
    ),
    cell: ({ row }) => {
      const { estado } = row.original;
      if (estado === EstadoMesa.DISPONIBLE) {
        return (
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
            Activo
          </span>
        );
      }
      if (estado === EstadoMesa.OCUPADA) {
        return (
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>
            Inactivo
          </span>
        );
      }
      if (estado === EstadoMesa.RESERVADA) {
        return (
          <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
            Inactivo
          </span>
        );
      }
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <HeaderOptions
        column={column}
        title='Fecha Creación'
      />
    ),
    cell: ({ row }) => {
      const { creadoEn } = row.original;
      const date = new Date(creadoEn);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <HeaderOptions
        column={column}
        title='Fecha Actualización'
      />
    ),
    cell: ({ row }) => {
      const { actualizadoEn } = row.original;
      const date = new Date(actualizadoEn);
      return date.toLocaleDateString();
    },
  },
  {
    id: "Acciones",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <>
          <RowActions row={row.original} />
        </>
      );
    },
  },
];
