import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener el total de ingresos por ventas
export async function GET() {
  try {
    const ingresos = await prisma.venta.aggregate({
      where: { isDeleted: false },
      _sum: {
        total: true,
      },
    });

    return NextResponse.json({ totalIngresos: ingresos._sum.total || 0 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular los ingresos" },
      { status: 500 }
    );
  }
}
