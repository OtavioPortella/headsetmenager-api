import type { Request, Response } from 'express';
import { db } from '../database';
import { MaloteStatus } from '@prisma/client';

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
      status: MaloteStatus.ENVIADO,
    },
  });

  return res.status(201).json({
    malote: criado,
  });
}

export async function list(_: Request, res: Response) {
  const malotes = await db.malote.findMany();

  return res.json(malotes);
}
