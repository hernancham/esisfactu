import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { mesaId: string } }
) {
  try {
    const mesaId = parseInt(params.mesaId);

    const pedidos = await prisma.pedido.findMany({
      where: { mesaId, isDeleted: false },
      include: { detalles: true },
    });

    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los pedidos de la mesa" },
      { status: 500 }
    );
  }
}
