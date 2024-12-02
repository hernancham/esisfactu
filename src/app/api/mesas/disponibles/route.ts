import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EstadoMesa } from "@prisma/client";

export async function GET() {
  try {
    const mesasDisponibles = await prisma.mesa.findMany({
      where: { estado: EstadoMesa.DISPONIBLE, isDeleted: false },
    });
    return NextResponse.json(mesasDisponibles);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las mesas disponibles" },
      { status: 500 }
    );
  }
}
