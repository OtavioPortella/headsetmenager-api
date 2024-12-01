import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const {
    nome,
    admin,
    podeCriarUsuario,
    podeGerenciarMalotes,
    podeGerenciarPedidos,
    permitidoCriarUsuariosDosPerfis,
  } = req.body;

  const criado = await db.perfil.create({
    data: {
      nome,
      admin,
      podeCriarUsuario,
      podeGerenciarMalotes,
      podeGerenciarPedidos,
      permitidoCriarUsuariosDosPerfis,
    },
  });

  return res.status(201).json({
    perfil: criado,
  });
}

export async function index(req: Request, res: Response) {
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: req.userId,
    },
    include: {
      perfil: true,
    },
  });

  const perfis = await db.perfil.findMany({
    orderBy: { nome: 'asc' },
    where: {
      id: {
        in: user.perfil.permitidoCriarUsuariosDosPerfis,
      },
    },
  });

  return res.status(200).json({
    perfis,
  });
}
