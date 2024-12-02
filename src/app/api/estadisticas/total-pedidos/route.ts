import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para parámetros opcionales (rango de fechas)
const QuerySchema = z.object({
  fechaInicio: z.string().optional(),
  fechaFin: z.string().optional(),
});

// Obtener el total de pedidos realizados
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
      whereClause.creadoEn = {
        ...(query.fechaInicio ? { gte: new Date(query.fechaInicio) } : {}),
        ...(query.fechaFin ? { lte: new Date(query.fechaFin) } : {}),
      };
    }

    // Total de pedidos realizados
    const totalPedidos = await prisma.pedido.count({
      where: whereClause,
    });

    // Pedidos agrupados por estado
    const pedidosPorEstado = await prisma.pedido.groupBy({
      by: ["estado"],
      where: whereClause,
      _count: {
        id: true,
      },
    });

    const detallesPorEstado = pedidosPorEstado.map((pedido) => ({
      estado: pedido.estado,
      cantidadPedidos: pedido._count.id,
    }));

    return NextResponse.json({
      totalPedidos,
      pedidosPorEstado: detallesPorEstado,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular el total de pedidos" },
      { status: 500 }
    );
  }
}
