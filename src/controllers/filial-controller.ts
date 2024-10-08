import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { nome } = req.body;

  const { rua, bairro, numero, cep, cidade, estado } = req.body.endereco;

  const criado = await db.filial.create({
    data: {
      nome,
      endereco: {
        create: {
          rua,
          bairro,
          numero,
          cep,
          cidade,
          estado,
        },
      },
    },
  });

  return res.status(201).json({
    filial: criado,
  });
}

export async function index(_: Request, res: Response) {
  const filiais = await db.filial.findMany();

  return res.json(filiais);
}
