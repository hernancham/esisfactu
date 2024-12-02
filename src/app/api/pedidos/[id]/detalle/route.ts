import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema para validar el ID del pedido
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Obtener los detalles de un pedido
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const detalles = await prisma.detallePedido.findMany({
      where: { pedidoId: parseInt(id), isDeleted: false },
      include: {
        producto: true, // Incluye información del producto
      },
    });

    if (!detalles || detalles.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron detalles para este pedido" },
        { status: 404 }
      );
    }

    return NextResponse.json(detalles);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener los detalles del pedido" },
      { status: 500 }
    );
  }
}

// Actualizar detalles de un pedido
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);
    const body = await req.json();

    const DetallePedidoSchema = z.array(
      z.object({
        productoId: z
          .number()
          .int("El ID del producto debe ser un número entero"),
        cantidad: z.number().positive("La cantidad debe ser mayor a 0"),
        precio: z.number().positive("El precio debe ser mayor a 0"),
        observaciones: z.string().optional(),
      })
    );

    const detalles = DetallePedidoSchema.parse(body);

    // Actualizar los detalles del pedido
    const detallesActualizados = await prisma.$transaction(async (tx) => {
      // Borra los detalles existentes
      await tx.detallePedido.deleteMany({
        where: { pedidoId: parseInt(id) },
      });

      // Crea los nuevos detalles
      return await tx.detallePedido.createMany({
        data: detalles.map((detalle) => ({
          pedidoId: parseInt(id),
          productoId: detalle.productoId,
          cantidad: detalle.cantidad,
          precio: detalle.precio,
          observaciones: detalle.observaciones,
        })),
      });
    });

    return NextResponse.json(detallesActualizados, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al actualizar los detalles del pedido" },
      { status: 500 }
    );
  }
}
