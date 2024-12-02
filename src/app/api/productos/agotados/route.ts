import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productosAgotados = await prisma.producto.findMany({
      where: { disponible: false, isDeleted: false },
      include: { categoria: true },
    });
    return NextResponse.json(productosAgotados);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los productos agotados" },
      { status: 500 }
    );
  }
}
