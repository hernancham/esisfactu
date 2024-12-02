import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Obtener todas las categorías (incluye filtro para Soft Delete)
export async function GET() {
  try {
    const categorias = await prisma.categoria.findMany({
      where: { isDeleted: false },
      include: { productos: true }, // Incluye productos relacionados
    });
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las categorías" },
      { status: 500 }
    );
  }
}
