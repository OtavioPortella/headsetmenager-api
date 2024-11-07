import type { Request, Response } from 'express';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { nome, estoqueSimples, estoqueDuplo } = req.body;

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
      estoqueDuplo,
      estoqueSimples,
    },
  });

  return res.status(201).json({
    filial: criado,
  });
}

export async function index(_: Request, res: Response) {
  const filiais = await db.filial.findMany({
    include: {
      endereco: true,
    },
  });

  return res.json(filiais);
}

export async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  await db.filial.delete({ where: { id: Number.parseInt(id) } });

  return res.status(204).json();
}

export async function update(req: Request, res: Response) {
  const { id, nome, estoqueSimples, estoqueDuplo } = req.body;

  const { rua, bairro, numero, cep, cidade, estado } = req.body.endereco;

  const criado = await db.filial.update({
    where: { id: Number(id) },
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
      estoqueDuplo,
      estoqueSimples,
    },
  });

  return res.status(201).json({
    filial: criado,
  });
}
