import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const empleadosInactivos = await prisma.empleado.findMany({
      where: { estado: "INACTIVO", isDeleted: false },
    });
    return NextResponse.json(empleadosInactivos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener empleados inactivos" },
      { status: 500 }
    );
  }
}
