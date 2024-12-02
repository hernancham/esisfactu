import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para parámetros opcionales (rango de fechas)
const QuerySchema = z.object({
  fechaInicio: z.string().optional(),
  fechaFin: z.string().optional(),
});

// Obtener el total de ventas realizadas y estadísticas adicionales
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = QuerySchema.parse({
      fechaInicio: url.searchParams.get("fechaInicio"),
      fechaFin: url.searchParams.get("fechaFin"),
    });

    const whereClause: any = { isDeleted: false };

    // Filtro por rango de fechas
    if (query.fechaInicio || query.fechaFin) {
      whereClause.createdAt = {
        ...(query.fechaInicio ? { gte: new Date(query.fechaInicio) } : {}),
        ...(query.fechaFin ? { lte: new Date(query.fechaFin) } : {}),
      };
    }

    // Total de ventas realizadas
    const totalVentas = await prisma.venta.count({
      where: whereClause,
    });

    // Ingresos totales
    const ingresosTotales = await prisma.venta.aggregate({
      where: whereClause,
      _sum: {
        total: true,
      },
    });

    // Ventas agrupadas por método de pago
    const ventasPorMetodo = await prisma.venta.groupBy({
      by: ["metodoPago"],
      where: whereClause,
      _count: {
        id: true,
      },
      _sum: {
        total: true,
      },
    });

    const detallesPorMetodo = ventasPorMetodo.map((venta) => ({
      metodoPago: venta.metodoPago,
      cantidadVentas: venta._count.id,
      ingresos: venta._sum.total || 0,
    }));

    return NextResponse.json({
      totalVentas,
      ingresosTotales: ingresosTotales._sum.total || 0,
      ventasPorMetodo: detallesPorMetodo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular el total de ventas" },
      { status: 500 }
    );
  }
}
