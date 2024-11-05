import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { qtdSimples, qtdDuplo, garantia, filialOrigemId, filialDestinoId } =
    req.body;

  const criado = await db.malote.create({
    data: {
      garantia,
      qtdDuplo: Number(qtdDuplo),
      qtdSimples: Number(qtdSimples),
      filialDestinoId,
      filialOrigemId,
    },
  });

  return res.status(201).json({
    malote: criado,
  });
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { qtdSimples, qtdDuplo, garantia, filialOrigemId, filialDestinoId } =
    req.body;

  const malote = await db.malote.findUnique({
    where: { id: Number(id) },
  });

  if (!malote) {
    return res.status(404).json({ error: 'Malote não encontrado' });
  }

  const atualizado = await db.malote.update({
    where: { id: Number(id) },
    data: {
      garantia,
      qtdDuplo: Number(qtdDuplo),
      qtdSimples: Number(qtdSimples),
      filialDestinoId,
      filialOrigemId,
    },
  });

  return res.status(201).json({
    malote: atualizado,
  });
}

export async function list(_: Request, res: Response) {
  const malotes = await db.malote.findMany();

  return res.json(malotes);
}
