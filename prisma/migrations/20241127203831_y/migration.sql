/*
  Warnings:

  - You are about to drop the column `id_empresa` on the `Mesa` table. All the data in the column will be lost.
  - You are about to drop the column `id_empresa` on the `Pedido` table. All the data in the column will be lost.
  - You are about to drop the column `id_empresa` on the `Producto` table. All the data in the column will be lost.
  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_restaurante` to the `Mesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_restaurante` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_restaurante` to the `Producto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmpleadoRol" AS ENUM ('Mozo', 'Cajero', 'Cocinero', 'Admin');

-- DropForeignKey
ALTER TABLE "Compra" DROP CONSTRAINT "Compra_id_cajero_fkey";

-- DropForeignKey
ALTER TABLE "Mesa" DROP CONSTRAINT "Mesa_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_id_mozo_fkey";

-- DropForeignKey
ALTER TABLE "Producto" DROP CONSTRAINT "Producto_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_id_empresa_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_id_rol_fkey";

-- AlterTable
ALTER TABLE "Mesa" DROP COLUMN "id_empresa",
ADD COLUMN     "id_restaurante" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "id_empresa",
ADD COLUMN     "id_restaurante" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "id_empresa",
ADD COLUMN     "id_restaurante" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Empresa";

-- DropTable
DROP TABLE "Rol";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "Restaurante" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "ruc" VARCHAR(11) NOT NULL,
    "direccion" VARCHAR(255),
    "telefono" VARCHAR(15),
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Restaurante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id" SERIAL NOT NULL,
    "usuario" VARCHAR(100) NOT NULL,
    "contrasena" VARCHAR(100) NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(15),
    "dni" VARCHAR(8) NOT NULL,
    "id_restaurante" INTEGER NOT NULL,
    "empleado_rol" "EmpleadoRol" NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Empleado" ADD CONSTRAINT "Empleado_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mesa" ADD CONSTRAINT "Mesa_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_mozo_fkey" FOREIGN KEY ("id_mozo") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "Restaurante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_id_cajero_fkey" FOREIGN KEY ("id_cajero") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
