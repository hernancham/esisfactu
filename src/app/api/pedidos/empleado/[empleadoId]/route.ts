import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { empleadoId: string } }
) {
  try {
    const empleadoId = parseInt(params.empleadoId);

    const pedidos = await prisma.pedido.findMany({
      where: { meseroId: empleadoId, isDeleted: false },
      include: { detalles: true },
    });

    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los pedidos del empleado" },
      { status: 500 }
    );
  }
}
