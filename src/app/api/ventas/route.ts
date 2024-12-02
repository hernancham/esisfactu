import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para creación de ventas
const VentaSchema = z.object({
  pedidoId: z.number().int("El ID del pedido debe ser un número entero"),
  total: z.number().positive("El total debe ser un número positivo"),
  metodoPago: z.enum(["EFECTIVO", "YAPE", "PLIN", "TARJETA"]),
  cajeroId: z
    .number()
    .int("El ID del cajero debe ser un número entero")
    .optional(),
});

// Obtener todas las ventas
export async function GET() {
  try {
    const ventas = await prisma.venta.findMany({
      where: { isDeleted: false },
      include: {
        pedido: true, // Incluye información del pedido asociado
        cajero: true, // Incluye información del cajero
      },
    });
    return NextResponse.json(ventas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las ventas" },
      { status: 500 }
    );
  }
}

// Crear una nueva venta
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar los datos con Zod
    const data = VentaSchema.parse(body);

    // Validar si ya existe una venta asociada al pedido
    const ventaExistente = await prisma.venta.findFirst({
      where: { pedidoId: data.pedidoId, isDeleted: false },
    });
    if (ventaExistente) {
      return NextResponse.json(
        { error: "Ya existe una venta asociada a este pedido" },
        { status: 409 }
      );
    }

    // Crear la nueva venta
    const nuevaVenta = await prisma.venta.create({
      data,
    });

    return NextResponse.json(nuevaVenta, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear la venta" },
      { status: 500 }
    );
  }
}
