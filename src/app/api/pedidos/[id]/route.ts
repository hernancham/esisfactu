import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { EstadoPedido } from "@prisma/client";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Esquema de validación para creación/actualización de pedidos
const PedidoSchema = z.object({
  mesaId: z.number().int("El ID de la mesa debe ser un número entero"),
  meseroId: z.number().int("El ID del mesero debe ser un número entero"),
  estado: z
    .enum([
      EstadoPedido.PENDIENTE,
      EstadoPedido.PREPARANDO,
      EstadoPedido.SERVIDO,
      EstadoPedido.CANCELADO,
    ])
    .optional(),
  detalles: z.array(
    z.object({
      productoId: z
        .number()
        .int("El ID del producto debe ser un número entero"),
      cantidad: z.number().positive("La cantidad debe ser mayor a 0"),
      precio: z.number().positive("El precio debe ser mayor a 0"),
      observaciones: z.string().optional(),
    })
  ),
});

// Obtener un pedido por ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const pedido = await prisma.pedido.findUnique({
      where: { id: parseInt(id), isDeleted: false },
      include: {
        mesa: true,
        mesero: true,
        detalles: {
          include: { producto: true },
        },
      },
    });

    if (!pedido) {
      return NextResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(pedido);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener el pedido" },
      { status: 500 }
    );
  }
}

// Actualizar un pedido
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);
    const body = await req.json();

    const data = PedidoSchema.parse(body);

    // Actualizar el pedido
    const pedidoActualizado = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: {
        mesaId: data.mesaId,
        meseroId: data.meseroId,
        estado: data.estado,
        detalles: {
          deleteMany: {}, // Borra los detalles existentes
          create: data.detalles.map((detalle) => ({
            productoId: detalle.productoId,
            cantidad: detalle.cantidad,
            precio: detalle.precio,
            observaciones: detalle.observaciones,
          })),
        },
      },
      include: {
        detalles: true,
      },
    });

    return NextResponse.json(pedidoActualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al actualizar el pedido" },
      { status: 500 }
    );
  }
}

// Eliminar (Soft Delete) un pedido
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const pedidoEliminado = await prisma.pedido.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    });

    return NextResponse.json(pedidoEliminado, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al eliminar el pedido" },
      { status: 500 }
    );
  }
}
