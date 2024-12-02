import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Esquema para actualización de productos
const ProductoUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  descripcion: z.string().optional(),
  imagenURL: z.string().url("Debe ser una URL válida").optional(),
  precio: z.number().positive().optional(),
  categoriaId: z.number().int().optional(),
  disponible: z.boolean().optional(),
});

// Obtener un producto por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const producto = await prisma.producto.findUnique({
      where: { id: parseInt(id), isDeleted: false },
      include: { categoria: true },
    });

    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(producto);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    );
  }
}

// Actualizar un producto
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);
    const body = await req.json();

    const data = ProductoUpdateSchema.parse(body);

    // Validar si el nombre ya existe en otro producto
    if (data.nombre) {
      const nombreExiste = await prisma.producto.findFirst({
        where: {
          nombre: data.nombre,
          id: { not: parseInt(id) },
          isDeleted: false,
        },
      });
      if (nombreExiste) {
        return NextResponse.json(
          { error: "El nombre del producto ya existe" },
          { status: 409 }
        );
      }
    }

    // Actualizar el producto
    const productoActualizado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(productoActualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    );
  }
}

// Eliminar (Soft Delete) un producto
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const productoEliminado = await prisma.producto.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });

    return NextResponse.json(productoEliminado, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    );
  }
}
