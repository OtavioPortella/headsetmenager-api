-- CreateTable
CREATE TABLE "Perfil" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "podeCriarUsuario" BOOLEAN NOT NULL DEFAULT false,
    "admin" BOOLEAN NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "qtdSimples" INTEGER NOT NULL,
    "matriculas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "idPerfil" INTEGER NOT NULL,
    "idCarteira" INTEGER,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carteira" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idFilial" INTEGER,

    CONSTRAINT "Carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filial" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idEndereco" INTEGER NOT NULL,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" SERIAL NOT NULL,
    "qtdSimples" INTEGER NOT NULL,
    "qtdDuplo" INTEGER NOT NULL,
    "idFilial" INTEGER NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Malote" (
    "id" SERIAL NOT NULL,
    "qtdSimples" INTEGER NOT NULL,
    "qtdDuplo" INTEGER NOT NULL,
    "garantia" BOOLEAN NOT NULL,
    "filialOrigemId" INTEGER NOT NULL,
    "filialDestinoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Malote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_matricula_key" ON "User"("matricula");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idCarteira_fkey" FOREIGN KEY ("idCarteira") REFERENCES "Carteira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carteira" ADD CONSTRAINT "Carteira_idFilial_fkey" FOREIGN KEY ("idFilial") REFERENCES "Filial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_idFilial_fkey" FOREIGN KEY ("idFilial") REFERENCES "Filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Malote" ADD CONSTRAINT "Malote_filialOrigemId_fkey" FOREIGN KEY ("filialOrigemId") REFERENCES "Filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Malote" ADD CONSTRAINT "Malote_filialDestinoId_fkey" FOREIGN KEY ("filialDestinoId") REFERENCES "Filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
