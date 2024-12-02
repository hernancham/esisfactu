import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const productosVendidos = await prisma.detallePedido.groupBy({
      by: ["productoId"],
      where: { isDeleted: false },
      _sum: {
        cantidad: true,
      },
      orderBy: {
        _sum: {
          cantidad: "desc",
        },
      },
      take: 10, // Los 10 productos más vendidos
    });

    const resultados = await Promise.all(
      productosVendidos.map(async (registro) => {
        const producto = await prisma.producto.findUnique({
          where: { id: registro.productoId },
          select: { nombre: true, precio: true },
        });

        return {
          producto: producto?.nombre || "Producto desconocido",
          precio: producto?.precio || 0,
          cantidadVendida: registro._sum.cantidad || 0,
        };
      })
    );

    return NextResponse.json(resultados);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al calcular los productos más vendidos" },
      { status: 500 }
    );
  }
}
