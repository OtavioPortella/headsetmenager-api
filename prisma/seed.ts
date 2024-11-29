import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const endereco = await db.endereco.create({
    data: {
      rua: 'Rua teste',
      numero: '365',
      bairro: 'Centro',
      cep: '16025-000',
      cidade: 'Araçatuba',
      estado: 'São Paulo',
    },
  });

  const filial = await db.filial.create({
    data: {
      nome: 'Matriz',
      idEndereco: endereco.id,
    },
  });

  const suporte = await db.perfil.create({
    data: {
      nome: 'Suporte',
      admin: true,
      podeCriarUsuario: true,
      podeGerenciarMalotes: true,
      podeGerenciarPedidos: true,
    },
  });

  await db.perfil.create({
    data: {
      nome: 'Supervisor',
      admin: false,
      podeCriarUsuario: true,
      podeGerenciarPedidos: true,
    },
  });

  await db.perfil.create({
    data: {
      nome: 'Coordenador',
      admin: false,
      podeCriarUsuario: false,
      podeGerenciarPedidos: true,
    },
  });

  await db.perfil.create({
    data: {
      nome: 'Manutenção',
      admin: false,
      podeCriarUsuario: false,
      podeGerenciarMalotes: true,
      podeGerenciarPedidos: false,
    },
  });

  const carteira = await db.carteira.create({
    data: {
      nome: 'Suporte',
      idFilial: filial.id,
    },
  });

  await db.user.create({
    data: {
      nome: 'Admiro',
      idPerfil: suporte.id,
      matricula: 'admin',
      senha: await bcrypt.hash('admin', 8),
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
