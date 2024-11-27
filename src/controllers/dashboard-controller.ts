import type { Request, Response } from 'express';
import { db } from '../database';
import { StatusPedido } from '@prisma/client';

export async function index(_: Request, res: Response) {
  const filials = await db.filial.findMany({
    include: {
      carteiras: {
        include: {
          usuarios: {
            include: {
              pedido: {
                where: {
                  deletedAt: null,
                },
              },
            },
          },
        },
      },
    },
  });

  const dashboard = filials.map((filial) => {
    const allOrders = filial.carteiras.flatMap((carteira) =>
      carteira.usuarios.flatMap((user) => user.pedido),
    );

    const pendingOrders = allOrders.filter(
      (order) => order.status === StatusPedido.PENDENTE,
    );

    return {
      id: filial.id,
      nome: filial.nome,
      estoqueSimples: filial.estoqueSimples,
      estoqueDuplo: filial.estoqueDuplo,
      pedidosPendentes: pendingOrders.length,
      totalPedidos: allOrders.length,
    };
  });

  return res.json(dashboard);
}
