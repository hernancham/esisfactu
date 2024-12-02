import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalVentas = await prisma.venta.aggregate({
      where: { isDeleted: false },
      _sum: {
        total: true,
      },
    });

    return NextResponse.json({ total: totalVentas._sum.total || 0 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular el total de ventas" },
      { status: 500 }
    );
  }
}
