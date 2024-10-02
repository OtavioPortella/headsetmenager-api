import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { nome, idFilial } = req.body;

  const criado = await db.carteira.create({
    data: {
      nome,
      idFilial,
    },
  });

  return res.status(201).json({
    carteira: criado,
  });
}
