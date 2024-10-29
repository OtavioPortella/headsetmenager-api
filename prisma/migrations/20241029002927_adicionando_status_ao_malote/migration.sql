/*
  Warnings:

  - Added the required column `status` to the `Malote` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MaloteStatus" AS ENUM ('ENVIADO', 'RECEBIDO');

-- AlterTable
ALTER TABLE "Malote" ADD COLUMN     "status" "MaloteStatus" NOT NULL;
