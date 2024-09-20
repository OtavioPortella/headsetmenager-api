-- CreateTable
CREATE TABLE "Perfil" (
    "id" SERIAL NOT NULL,
    "perfil" TEXT NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "codTicket" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "qtdSimples" INTEGER NOT NULL,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "idPerfil" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carteira" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
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

    CONSTRAINT "Malote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
