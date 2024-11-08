import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { qtdSimples, matriculas, motivo } = req.body;

  const criado = await db.pedido.create({
    data: {
      qtdSimples,
      matriculas,
      motivo,
      idUsuario: req.userId,
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
