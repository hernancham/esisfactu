import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener el total de mesas registradas y agrupadas por estado
export async function GET() {
  try {
    // Total de mesas
    const totalMesas = await prisma.mesa.count({
      where: { isDeleted: false },
    });

    // Mesas agrupadas por estado
    const mesasPorEstado = await prisma.mesa.groupBy({
      by: ["estado"],
      where: { isDeleted: false },
      _count: {
        id: true,
      },
    });

    const detallesPorEstado = mesasPorEstado.map((mesa) => ({
      estado: mesa.estado,
      cantidadMesas: mesa._count.id,
    }));

    return NextResponse.json({
      totalMesas,
      mesasPorEstado: detallesPorEstado,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular el total de mesas" },
      { status: 500 }
    );
  }
}
