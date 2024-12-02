import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { EstadoMesa } from "@prisma/client";

// Esquema de validación para creación/actualización de mesas
const MesaSchema = z.object({
  codigoMesa: z.string().min(1, "El código de la mesa es obligatorio"),
  estado: z
    .enum([EstadoMesa.DISPONIBLE, EstadoMesa.OCUPADA, EstadoMesa.RESERVADA])
    .optional(),
});

// Obtener todas las mesas (filtro Soft Delete)
export async function GET() {
  try {
    const mesas = await prisma.mesa.findMany({
      where: { isDeleted: false },
    });
    return NextResponse.json(mesas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las mesas" },
      { status: 500 }
    );
  }
}

// Crear una nueva mesa
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar los datos con Zod
    const data = MesaSchema.parse(body);

    const nuevaMesa = await prisma.mesa.create({
      data,
    });

    return NextResponse.json(nuevaMesa, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear la mesa" },
      { status: 500 }
    );
  }
}
