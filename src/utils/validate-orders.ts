import { db } from '../database';
import { StatusPedido } from '@prisma/client';

export async function validateOrdersByBranch(filialId: number) {
  const filial = await db.filial.findUnique({
    where: { id: filialId },
  });

  if (!filial) return;

  // Atualiza pedidos que podem ser atendidos (estoque suficiente)
  await db.pedido.updateMany({
    where: {
      status: StatusPedido.PENDENTE,
      usuario: {
        carteira: {
          idFilial: filialId,
        },
      },
      deletedAt: null,
      qtdSimples: {
        lte: filial.estoqueSimples,
      },
    },
    data: {
      status: StatusPedido.NOVO,
    },
  });

  // Atualiza pedidos que não podem ser atendidos (estoque insuficiente)
  await db.pedido.updateMany({
    where: {
      status: StatusPedido.NOVO,
      usuario: {
        carteira: {
          idFilial: filialId,
        },
      },
      deletedAt: null,
      qtdSimples: {
        gt: filial.estoqueSimples,
      },
    },
    data: {
      status: StatusPedido.PENDENTE,
    },
  });
}
