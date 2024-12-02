import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Obtener una factura por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const factura = await prisma.factura.findUnique({
      where: { id: parseInt(id), isDeleted: false },
      include: {
        venta: true,
      },
    });

    if (!factura) {
      return NextResponse.json(
        { error: "Factura no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(factura);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener la factura" },
      { status: 500 }
    );
  }
}

// Eliminar (Soft Delete) una factura
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const facturaEliminada = await prisma.factura.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });

    return NextResponse.json(facturaEliminada, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al eliminar la factura" },
      { status: 500 }
    );
  }
}
