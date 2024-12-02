import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para creación de facturas
const FacturaSchema = z.object({
  numero: z.string().min(1, "El número de factura es obligatorio"),
  cliente: z.string().optional(),
  ruc: z.string().optional(),
  direccion: z.string().optional(),
  ventaId: z.number().int("El ID de la venta debe ser un número entero"),
});

// Obtener todas las facturas
export async function GET() {
  try {
    const facturas = await prisma.factura.findMany({
      where: { isDeleted: false },
      include: {
        venta: true, // Incluye información de la venta relacionada
      },
    });
    return NextResponse.json(facturas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las facturas" },
      { status: 500 }
    );
  }
}

// Crear una nueva factura
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar los datos con Zod
    const data = FacturaSchema.parse(body);

    // Validar si ya existe una factura para la venta
    const facturaExistente = await prisma.factura.findFirst({
      where: { ventaId: data.ventaId, isDeleted: false },
    });
    if (facturaExistente) {
      return NextResponse.json(
        { error: "Ya existe una factura asociada a esta venta" },
        { status: 409 }
      );
    }

    // Crear la nueva factura
    const nuevaFactura = await prisma.factura.create({
      data,
    });

    return NextResponse.json(nuevaFactura, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear la factura" },
      { status: 500 }
    );
  }
}
