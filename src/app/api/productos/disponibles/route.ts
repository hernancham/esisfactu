import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productosDisponibles = await prisma.producto.findMany({
      where: { disponible: true, isDeleted: false },
      include: { categoria: true },
    });
    return NextResponse.json(productosDisponibles);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los productos disponibles" },
      { status: 500 }
    );
  }
}
