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
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);

    const empleado = await prisma.empleado.findUnique({
      where: { id: parseInt(id), isDeleted: false },
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

// Actualizar un empleado
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = IdSchema.parse(params.id);
    const body = await req.json();

    const data = EmpleadoUpdateSchema.parse(body);

    // Validar si el correo ya existe en otro empleado
    if (data.correo) {
      const correoExiste = await prisma.empleado.findUnique({
        where: { correo: data.correo },
      });
      if (correoExiste && correoExiste.id !== parseInt(id)) {
        return NextResponse.json(
          { error: "El correo ya está en uso por otro empleado" },
          { status: 409 }
        );
      }
    }

    // Validar si el código de empleado ya existe en otro empleado
    if (data.codigoEmpleado) {
      const codigoExiste = await prisma.empleado.findUnique({
        where: { codigoEmpleado: data.codigoEmpleado },
      });
      if (codigoExiste && codigoExiste.id !== parseInt(id)) {
        return NextResponse.json(
          { error: "El código del empleado ya está en uso por otro empleado" },
          { status: 409 }
        );
      }
    }

    // Actualizar el empleado
    const empleadoActualizado = await prisma.empleado.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(empleadoActualizado);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al actualizar el empleado" },
      { status: 500 }
    );
  }
}
