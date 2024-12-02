import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para creación/actualización de categorías
const CategoriaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

// Obtener todas las categorías (incluye filtro para Soft Delete)
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      where: { isDeleted: false },
    });
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las categorías" },
      { status: 500 }
    );
  }
}

// Crear una nueva categoría
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar datos con Zod
    const data = CategoriaSchema.parse(body);

    const nuevaCategoria = await prisma.categoria.create({
      data,
    });

    return NextResponse.json(nuevaCategoria, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear la categoría" },
      { status: 500 }
    );
  }
}
