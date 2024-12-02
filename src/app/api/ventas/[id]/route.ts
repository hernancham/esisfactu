import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Obtener una venta por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const venta = await prisma.venta.findUnique({
      where: { id: parseInt(id), isDeleted: false },
      include: {
        pedido: true,
        cajero: true,
      },
    });

    if (!venta) {
      return NextResponse.json(
        { error: "Venta no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(venta);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener la venta" },
      { status: 500 }
    );
  }
}

// Eliminar (Soft Delete) una venta
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const ventaEliminada = await prisma.venta.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });

    return NextResponse.json(ventaEliminada, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al eliminar la venta" },
      { status: 500 }
    );
  }
}
