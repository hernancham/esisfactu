import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const servidos = await prisma.pedido.findMany({
      where: { estado: "SERVIDO", isDeleted: false },
    });
    return NextResponse.json(servidos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los pedidos servidos" },
      { status: 500 }
    );
  }
}
