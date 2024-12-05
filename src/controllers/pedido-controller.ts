import type { Request, Response } from 'express';
import { db } from '../database';
import { StatusPedido } from '@prisma/client';
import { validateOrdersByBranch } from '../utils/validate-orders';

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

export async function index(req: Request, res: Response) {
  const user = await db.user.findUnique({
    where: {
      id: Number(req.userId),
    },
    include: {
      perfil: true,
    },
  });

  const pedidos = await db.pedido.findMany({
    where: {
      deletedAt: null,
      idUsuario: !user?.perfil.admin ? user?.id : undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      usuario: true,
    },
  });

  return res.json(pedidos);
}

export async function destroy(req: Request, res: Response) {
  const { id } = req.params;

  await db.pedido.update({
    where: { id: Number(id) },
    data: { deletedAt: new Date() },
  });

  return res.status(204).json();
}

export async function update(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;

  const pedido = await db.pedido.findUnique({
    where: {
      deletedAt: null,
      id: Number(id),
    },
    include: {
      usuario: {
        include: {
          carteira: {
            include: {
              filial: true,
            },
          },
        },
      },
    },
  });

  if (!pedido) {
    return res.status(400).json({
      error: 'Pedido não encontrado',
    });
  }

  const filial = await db.filial.findUnique({
    where: {
      id: pedido.usuario.carteira?.filial?.id ?? -1,
    },
  });

  if (!filial) {
    return res.status(400).json({
      error: 'Filial não encontrado',
    });
  }

  if ([StatusPedido.EM_ATENDIMENTO, StatusPedido.FINALIZADO].includes(status)) {
    if (filial.estoqueSimples < pedido.qtdSimples) {
      return res.status(400).json({
        error: 'Não há estoque suficiente para este pedido',
      });
    }
  }

  await db.pedido.update({
    where: { id: pedido.id },
    data: {
      status,
    },
  });

  if (status === StatusPedido.FINALIZADO) {
    await db.filial.update({
      where: {
        id: filial.id,
      },
      data: {
        estoqueSimples: {
          decrement: pedido.qtdSimples,
        },
      },
    });
    await validateOrdersByBranch(filial.id);
  }

  return res.status(204).json();
}
