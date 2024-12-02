import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { EstadoEmpleado } from "@prisma/client";

// Esquema para validar el ID
const IdSchema = z.string().regex(/^\d+$/, "El ID debe ser un número");

// Esquema para actualizar empleados
const EmpleadoUpdateSchema = z.object({
  nombre: z.string().min(1).optional(),
  correo: z.string().email().optional(),
  codigoEmpleado: z.string().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  fechaNacimiento: z.coerce.date().optional(),
  estado: z.enum([EstadoEmpleado.ACTIVO, EstadoEmpleado.INACTIVO]).optional(),
});

// Obtener un empleado por ID
export async function GET(
  req: Request,
  { params }: { params: { codigoEmpleado: string } }
) {
  try {
    const codigoEmpleado = IdSchema.parse(params.codigoEmpleado);

    const empleado = await prisma.empleado.findUnique({
      where: { codigoEmpleado: codigoEmpleado, isDeleted: false },
    });

    if (!empleado) {
      return NextResponse.json(
        { error: "Empleado no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(empleado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al obtener el empleado" },
      { status: 500 }
    );
  }
}
