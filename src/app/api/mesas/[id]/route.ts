import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { EstadoMesa } from "@prisma/client";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Esquema para actualizar mesa
const MesaUpdateSchema = z.object({
  codigoMesa: z
    .string()
    .min(1, "El código de la mesa es obligatorio")
    .optional(),
  estado: z
    .enum([EstadoMesa.DISPONIBLE, EstadoMesa.OCUPADA, EstadoMesa.RESERVADA])
    .optional(),
});

// Obtener una mesa por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const mesa = await prisma.mesa.findUnique({
      where: { id: parseInt(id), isDeleted: false },
    });

    if (!mesa) {
      return NextResponse.json(
        { error: "Mesa no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(mesa);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener la mesa" },
      { status: 500 }
    );
  }
}

// Actualizar una mesa
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);
    const body = await req.json();

    const data = MesaUpdateSchema.parse(body);

    const mesaActualizada = await prisma.mesa.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(mesaActualizada);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al actualizar la mesa" },
      { status: 500 }
    );
  }
}

// Eliminar (Soft Delete) una mesa
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const mesaEliminada = await prisma.mesa.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });

    return NextResponse.json(mesaEliminada, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al eliminar la mesa" },
      { status: 500 }
    );
  }
}
