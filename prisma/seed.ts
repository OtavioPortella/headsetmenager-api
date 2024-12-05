import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

async function main() {
  const endMatriz = await db.endereco.create({
    data: {
      rua: 'Rua teste',
      numero: '365',
      bairro: 'Centro',
      cep: '16025-000',
      cidade: 'Araçatuba',
      estado: 'São Paulo',
    },
  });

  const endFilial1 = await db.endereco.create({
    data: {
      rua: 'Avenida Brasil',
      numero: '1250',
      bairro: 'Jardim Nova York',
      cep: '16018-310',
      cidade: 'Araçatuba',
      estado: 'São Paulo',
    },
  });

  const endFilial2 = await db.endereco.create({
    data: {
      rua: 'Rua Duque de Caxias',
      numero: '478',
      bairro: 'Vila Bandeirantes',
      cep: '16015-220',
      cidade: 'Araçatuba',
      estado: 'São Paulo',
    },
  });

  const filialMatriz = await db.filial.create({
    data: {
      nome: 'Matriz',
      idEndereco: endMatriz.id,
    },
  });
  const filial2 = await db.filial.create({
    data: {
      nome: 'Filial 2',
      idEndereco: endFilial1.id,
    },
  });
  const manutencao = await db.filial.create({
    data: {
      nome: 'Manutenção',
      idEndereco: endFilial2.id,
    },
  });

  const suporte = await db.perfil.create({
    data: {
      id: 1,
      nome: 'Suporte',
      admin: true,
      podeCriarUsuario: true,
      podeGerenciarMalotes: true,
      podeGerenciarPedidos: true,
      permitidoCriarUsuariosDosPerfis: [2, 3, 4],
    },
  });

  const perfilSupervisor = await db.perfil.create({
    data: {
      id: 2,
      nome: 'Supervisor',
      admin: false,
      podeCriarUsuario: true,
      podeGerenciarPedidos: true,
      podeGerenciarMalotes: false,
      permitidoCriarUsuariosDosPerfis: [3],
    },
  });

  await db.perfil.create({
    data: {
      id: 3,
      nome: 'Coordenador',
      admin: false,
      podeCriarUsuario: false,
      podeGerenciarPedidos: true,
    },
  });

  const perfilMan = await db.perfil.create({
    data: {
      id: 4,
      nome: 'Manutenção',
      admin: false,
      podeCriarUsuario: false,
      podeGerenciarMalotes: true,
      podeGerenciarPedidos: false,
    },
  });

  const carteiraSuporte = await db.carteira.create({
    data: {
      nome: 'Suporte',
      idFilial: filialMatriz.id,
    },
  });
  const carteiraBanco1 = await db.carteira.create({
    data: {
      nome: 'Banco 1',
      idFilial: filialMatriz.id,
    },
  });
  const carteiraCompras = await db.carteira.create({
    data: {
      nome: 'Compras',
      idFilial: manutencao.id,
    },
  });
  await db.carteira.create({
    data: {
      nome: 'Carteira 2',
      idFilial: filial2.id,
    },
  });

  await db.user.create({
    data: {
      nome: 'Admiro',
      idPerfil: suporte.id,
      matricula: 'admin',
      senha: await bcrypt.hash('admin', 8),
      idCarteira: carteiraSuporte.id,
    },
  });

  await db.user.create({
    data: {
      nome: 'Usuário supervisor',
      idPerfil: perfilSupervisor.id,
      matricula: 'supervisor',
      senha: await bcrypt.hash('1234', 8),
      idCarteira: carteiraBanco1.id,
    },
  });

  await db.user.create({
    data: {
      nome: 'Usuário compras',
      idPerfil: perfilMan.id,
      matricula: 'compras',
      senha: await bcrypt.hash('1234', 8),
      idCarteira: carteiraCompras.id,
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
