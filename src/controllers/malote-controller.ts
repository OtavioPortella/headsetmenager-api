import type { Request, Response } from 'express';
import { db } from '../database';
import { MaloteStatus } from '@prisma/client';

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
      status: MaloteStatus.ENVIADO,
    },
  });

  return res.status(201).json({
    malote: criado,
  });
}
