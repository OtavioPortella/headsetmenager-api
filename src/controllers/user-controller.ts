import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { nome, idPerfil, matricula, idCarteira, senha } = req.body;

  const passwordHash = await bcrypt.hash(senha, 10);

  const criado = await db.user.create({
    data: {
      nome,
      idPerfil,
      matricula,
      idCarteira,
      senha: passwordHash,
    },
  });

  return res.status(201).json({
    user: criado,
  });
}

export async function show(req: Request, res: Response) {
  const user = await db.user.findUnique({
    where: { id: Number(req.userId), deletedAt: null },
    select: {
      id: true,
      nome: true,
      matricula: true,
      carteira: {
        select: {
          id: true,
          nome: true,
          filial: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      },
      perfil: {
        select: {
          id: true,
          nome: true,
          podeCriarUsuario: true,
          admin: true,
        },
      },
    },
  });

  return res.status(200).json({
    user,
  });
}

export async function index(req: Request, res: Response) {
  const { idFilial } = req.query;

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: req.userId,
      deletedAt: null,
    },
    include: {
      perfil: true,
    },
  });

  const users = await db.user.findMany({
    select: {
      id: true,
      nome: true,
      matricula: true,
      carteira: {
        select: {
          id: true,
          nome: true,
          filial: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      },
      perfil: {
        select: {
          id: true,
          nome: true,
          podeCriarUsuario: true,
          admin: true,
        },
      },
    },
    orderBy: { nome: 'asc' },
    where: {
      deletedAt: null,
      carteira: {
        id: !user.perfil.admin ? (user.idCarteira ?? undefined) : undefined,
        idFilial: idFilial ? Number(idFilial) : undefined,
      },
    },
  });

  return res.status(200).json({
    users,
  });
}

export async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  await db.user.update({
    where: {
      id: Number(id),
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return res.status(204).json();
}
