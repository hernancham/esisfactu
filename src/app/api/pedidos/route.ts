import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { EstadoPedido } from "@prisma/client";

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

// Obtener todos los pedidos (Soft Delete y relaciones incluidas)
export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany({
      where: { isDeleted: false },
      include: {
        mesa: true,
        mesero: true,
        detalles: {
          include: { producto: true },
        },
      },
    });
    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los pedidos" },
      { status: 500 }
    );
  }
}

// Crear un nuevo pedido
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar los datos con Zod
    const data = PedidoSchema.parse(body);

    // Crear el pedido con detalles
    const nuevoPedido = await prisma.pedido.create({
      data: {
        mesaId: data.mesaId,
        meseroId: data.meseroId,
        estado: data.estado || EstadoPedido.PENDIENTE,
        detalles: {
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

    return NextResponse.json(nuevoPedido, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear el pedido" },
      { status: 500 }
    );
  }
}
