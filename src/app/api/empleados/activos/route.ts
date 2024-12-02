import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const empleadosActivos = await prisma.empleado.findMany({
      where: { estado: "ACTIVO", isDeleted: false },
    });
    return NextResponse.json(empleadosActivos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener empleados activos" },
      { status: 500 }
    );
  }
}
