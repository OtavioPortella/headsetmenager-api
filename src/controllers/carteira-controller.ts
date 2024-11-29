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

export async function index(req: Request, res: Response) {
  const { idFilial } = req.query;

  const carteiras = await db.carteira.findMany({
    include: {
      filial: true,
    },
    where: idFilial ? { idFilial: Number(idFilial) } : undefined,
    orderBy: { nome: 'asc' },
  });

  return res.json(carteiras);
}

export async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  await db.carteira.delete({ where: { id: Number(id) } });

  return res.status(204).json();
}
