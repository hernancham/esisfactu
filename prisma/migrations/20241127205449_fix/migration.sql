/*
  Warnings:

  - You are about to drop the column `direccion` on the `Restaurante` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Restaurante` table. All the data in the column will be lost.
  - You are about to drop the column `ruc` on the `Restaurante` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Restaurante` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_empresa]` on the table `Restaurante` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_empresa` to the `Restaurante` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoEmpresa" AS ENUM ('Restaurante');

-- AlterTable
ALTER TABLE "Restaurante" DROP COLUMN "direccion",
DROP COLUMN "nombre",
DROP COLUMN "ruc",
DROP COLUMN "telefono",
ADD COLUMN     "id_empresa" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "ruc" VARCHAR(11) NOT NULL,
    "direccion" VARCHAR(255),
    "telefono" VARCHAR(15),
    "tipo_empresa" "TipoEmpresa" NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurante_id_empresa_key" ON "Restaurante"("id_empresa");

-- AddForeignKey
ALTER TABLE "Restaurante" ADD CONSTRAINT "Restaurante_id_empresa_fkey" FOREIGN KEY ("id_empresa") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
