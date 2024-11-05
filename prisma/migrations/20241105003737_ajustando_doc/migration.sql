/*
  Warnings:

  - You are about to drop the column `status` on the `Malote` table. All the data in the column will be lost.
  - You are about to drop the `Estoque` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `motivo` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MotivoPedido" AS ENUM ('NOVATO', 'TROCA');

-- DropForeignKey
ALTER TABLE "Estoque" DROP CONSTRAINT "Estoque_idFilial_fkey";

-- AlterTable
ALTER TABLE "Filial" ADD COLUMN     "estoqueDuplo" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "estoqueSimples" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Malote" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "motivo" "MotivoPedido" NOT NULL;

-- DropTable
DROP TABLE "Estoque";
