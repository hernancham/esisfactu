import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para creación/actualización de productos
const ProductoSchema = z.object({
  nombre: z.string().min(1, "El nombre del producto es obligatorio"),
  descripcion: z.string().optional(),
  imagenURL: z.string().url("Debe ser una URL válida"),
  precio: z.number().positive("El precio debe ser un número positivo"),
  categoriaId: z
    .number()
    .int("El ID de la categoría debe ser un número entero"),
  disponible: z.boolean().optional(),
});

// Obtener todos los productos (Soft Delete y categoría incluida)
export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      where: { isDeleted: false },
      include: { categoria: true }, // Incluir datos de la categoría
    });
    return NextResponse.json(productos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los productos" },
      { status: 500 }
    );
  }
}

// Crear un nuevo producto
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar los datos con Zod
    const data = ProductoSchema.parse(body);

    // Validar si el nombre ya existe
    const nombreExiste = await prisma.producto.findFirst({
      where: { nombre: data.nombre, isDeleted: false },
    });
    if (nombreExiste) {
      return NextResponse.json(
        { error: "El nombre del producto ya existe" },
        { status: 409 }
      );
    }

    // Crear el nuevo producto
    const nuevoProducto = await prisma.producto.create({
      data,
    });

    return NextResponse.json(nuevoProducto, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
}
