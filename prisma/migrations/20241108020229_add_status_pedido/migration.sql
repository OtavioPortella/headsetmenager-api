/*
  Warnings:

  - The values [TROCA] on the enum `MotivoPedido` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('NOVO', 'PENDENTE', 'EM_ATENDIMENTO', 'FINALIZADO');

-- AlterEnum
BEGIN;
CREATE TYPE "MotivoPedido_new" AS ENUM ('NOVATO', 'MAL_CONTATO', 'MICROFONE_MUDO', 'ALTO_FALANTE_MUDO', 'ARCO_QUEBRADO', 'RUIDO', 'OUTROS');
ALTER TABLE "Pedido" ALTER COLUMN "motivo" TYPE "MotivoPedido_new" USING ("motivo"::text::"MotivoPedido_new");
ALTER TYPE "MotivoPedido" RENAME TO "MotivoPedido_old";
ALTER TYPE "MotivoPedido_new" RENAME TO "MotivoPedido";
DROP TYPE "MotivoPedido_old";
COMMIT;

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "status" "StatusPedido" NOT NULL DEFAULT 'NOVO';
