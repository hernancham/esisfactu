import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pendientes = await prisma.pedido.findMany({
      where: { estado: "PENDIENTE", isDeleted: false },
    });
    return NextResponse.json(pendientes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los pedidos pendientes" },
      { status: 500 }
    );
  }
}
