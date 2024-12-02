import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { empleadoId: string } }
) {
  try {
    const empleadoId = parseInt(params.empleadoId);

    const ventas = await prisma.venta.findMany({
      where: { cajeroId: empleadoId, isDeleted: false },
      include: { pedido: true },
    });

    return NextResponse.json(ventas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las ventas del empleado" },
      { status: 500 }
    );
  }
}
