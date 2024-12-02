import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const pedidos = await prisma.pedido.findMany({
      where: { meseroId: parseInt(id), isDeleted: false },
    });

    return NextResponse.json(pedidos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los pedidos" },
      { status: 500 }
    );
  }
}
