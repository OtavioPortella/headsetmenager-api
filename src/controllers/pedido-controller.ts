import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { qtdSimples, matriculas } = req.body;

  const criado = await db.pedido.create({
    data: {
      qtdSimples,
      matriculas,
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
