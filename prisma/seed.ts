import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const endereco = await db.endereco.create({
    data: {
      rua: 'Aviação',
      numero: '365',
      bairro: 'Santana',
      cep: '16025-020',
      cidade: 'Araçatuba',
      estado: 'São Paulo',
    },
  });

  const filial = await db.filial.create({
    data: {
      nome: 'Aval Aviação',
      carteiras: {
        create: [
          {
            nome: 'Cartão amigável',
          },
          {
            nome: 'Cartão liquidado',
          },
          {
            nome: 'BV Solar',
          },
          {
            nome: 'Crédito pessoal WO',
          },
          {
            nome: 'Mercado Pago',
          },
          {
            nome: 'Banco Pan',
          },
        ],
      },
      idEndereco: endereco.id,
    },
  });

  const suporte = await db.perfil.create({
    data: {
      nome: 'Suporte',
      admin: true,
      podeCriarUsuario: true,
    },
  });

  await db.perfil.create({
    data: {
      nome: 'Supervisor',
      admin: false,
      podeCriarUsuario: true,
    },
  });

  await db.perfil.create({
    data: {
      nome: 'Coordenador',
      admin: false,
      podeCriarUsuario: false,
    },
  });

  const carteira = await db.carteira.create({
    data: {
      nome: 'BV ADM',
      idFilial: filial.id,
    },
  });

  await db.user.create({
    data: {
      nome: 'Otávio',
      idPerfil: suporte.id,
      matricula: 't29682',
      senha: await bcrypt.hash('1234', 8),
      idCarteira: carteira.id,
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
    process.exit(0);
  })
  .catch(async (err) => {
    console.log(err);
    await db.$disconnect();
    process.exit(1);
  });
