import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { qtdSimples, qtdDuplo, garantia, filialOrigemId, filialDestinoId } =
    req.body;

  const criado = await db.malote.create({
    data: {
      garantia,
      qtdDuplo,
      qtdSimples,
      filialDestinoId,
      filialOrigemId,
    },
  });

  return res.status(201).json({
    malote: criado,
  });
}
