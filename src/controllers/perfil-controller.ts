import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { nome, admin, podeCriarUsuario } = req.body;

  const criado = await db.perfil.create({
    data: {
      nome,
      admin,
      podeCriarUsuario,
    },
  });

  return res.status(201).json({
    perfil: criado,
  });
}
