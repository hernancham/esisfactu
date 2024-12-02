import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EstadoEmpleado } from "@prisma/client";

// Obtener el total de empleados por estado y general
export async function GET() {
  try {
    // Total de empleados activos
    const empleadosActivos = await prisma.empleado.count({
      where: { estado: EstadoEmpleado.ACTIVO, isDeleted: false },
    });

    // Total de empleados inactivos
    const empleadosInactivos = await prisma.empleado.count({
      where: { estado: EstadoEmpleado.INACTIVO, isDeleted: false },
    });

    // Total general de empleados
    const totalEmpleados = empleadosActivos + empleadosInactivos;

    return NextResponse.json({
      totalEmpleados,
      activos: empleadosActivos,
      inactivos: empleadosInactivos,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular el total de empleados" },
      { status: 500 }
    );
  }
}
