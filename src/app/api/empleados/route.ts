import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Esquema de validación para creación/actualización de empleados
const EmpleadoSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  correo: z.string().email("Debe ser un correo válido"),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  fechaNacimiento: z.coerce.date().optional(),
  rolEmpleado: z.enum(["ADMINISTRADOR", "MESERO", "COCINERO", "CAJERO"]),
  codigoEmpleado: z.string().min(1, "El código del empleado es obligatorio"),
  estado: z.enum(["ACTIVO", "INACTIVO"]).optional(),
});

// Obtener todos los empleados (filtro Soft Delete)
export async function GET() {
  try {
    const empleados = await prisma.empleado.findMany({
      where: { isDeleted: false },
    });
    return NextResponse.json(empleados);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener los empleados" },
      { status: 500 }
    );
  }
}

// Crear un nuevo empleado
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar los datos con Zod
    const data = EmpleadoSchema.parse(body);

    // Validar si el correo ya existe
    const correoExiste = await prisma.empleado.findUnique({
      where: { correo: data.correo },
    });
    if (correoExiste) {
      return NextResponse.json(
        { error: "El correo ya está en uso" },
        { status: 409 }
      );
    }

    // Validar si el código de empleado ya existe
    const codigoExiste = await prisma.empleado.findUnique({
      where: { codigoEmpleado: data.codigoEmpleado },
    });
    if (codigoExiste) {
      return NextResponse.json(
        { error: "El código del empleado ya está en uso" },
        { status: 409 }
      );
    }

    // Crear el nuevo empleado
    const nuevoEmpleado = await prisma.empleado.create({
      data,
    });

    return NextResponse.json(nuevoEmpleado, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Error al crear el empleado" },
      { status: 500 }
    );
  }
}
