import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EstadoMesa } from "@prisma/client";

export async function GET() {
  try {
    const mesasOcupadas = await prisma.mesa.findMany({
      where: { estado: EstadoMesa.OCUPADA, isDeleted: false },
    });
    return NextResponse.json(mesasOcupadas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las mesas ocupadas" },
      { status: 500 }
    );
  }
}
