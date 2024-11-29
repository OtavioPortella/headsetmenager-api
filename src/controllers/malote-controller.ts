import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { qtdSimples, qtdDuplo, garantia, filialDestinoId } = req.body;

  const user = await db.user.findUnique({
    where: {
      id: req.userId,
    },
    include: {
      carteira: {
        include: {
          filial: true,
        },
      },
    },
  });

  if (!user?.carteira?.idFilial) {
    throw new Error('Usuário não vinculado a nenhuma filial ou carteira');
  }

  const criado = await db.malote.create({
    data: {
      garantia,
      qtdDuplo: Number(qtdDuplo),
      qtdSimples: Number(qtdSimples),
      filialDestinoId,
      filialOrigemId: user.carteira.idFilial,
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

export async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  const malote = await db.malote.findUnique({
    where: { id: Number(id) },
  });

  if (!malote) {
    return res.status(404).json({ error: 'Malote não encontrado' });
  }

  await db.malote.delete({
    where: { id: Number(id) },
  });

  return res.status(201).json({
    message: 'Malote deletado com sucesso',
  });
}

export async function list(req: Request, res: Response) {
  const user = await db.user.findUnique({
    where: {
      id: req.userId,
    },
    include: {
      carteira: true,
    },
  });

  const sended = await db.malote.findMany({
    where: {
      filialOrigemId: user?.carteira?.idFilial ?? -1,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      filialDestino: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });

  const received = await db.malote.findMany({
    where: {
      filialDestinoId: user?.carteira?.idFilial ?? -1,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      filialDestino: {
        select: {
          id: true,
          nome: true,
        },
      },
    },
  });

  return res.json({
    sended,
    received,
  });
}

export async function receive(req: Request, res: Response) {
  await db.malote.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      recebidoEm: new Date(),
    },
  });

  return res.status(204).json({});
}
