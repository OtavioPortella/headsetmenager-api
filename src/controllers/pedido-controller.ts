import type { Request, Response } from 'express';
import { db } from '../database';
import { StatusPedido } from '@prisma/client';

export async function create(req: Request, res: Response) {
  const { qtdSimples, matriculas, motivo } = req.body;

  let status: StatusPedido = StatusPedido.NOVO;

  const user = await db.user.findUnique({
    where: { id: req.userId },
    include: {
      carteira: {
        include: {
          filial: true,
        },
      },
    },
  });

  if (!user) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }

  if (!user.carteira?.filial) {
    return res.status(401).json({ error: 'Usuário não possui filial' });
  }

  if (user.carteira.filial.estoqueSimples < qtdSimples) {
    status = StatusPedido.PENDENTE;
  }

  const criado = await db.pedido.create({
    data: {
      qtdSimples,
      matriculas,
      motivo,
      idUsuario: req.userId,
      status,
    },
  });
  return res.status(201).json({
    pedido: criado,
  });
}

export async function index(_: Request, res: Response) {
  const pedidos = await db.pedido.findMany();

  return res.json(pedidos);
}

export async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  await db.pedido.delete({ where: { id: Number(id) } });

  return res.status(204).json();
}
