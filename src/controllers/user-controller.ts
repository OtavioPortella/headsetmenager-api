import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { nome, idPerfil, matricula, idCarteira, senha } = req.body;

  const passwordHash = await bcrypt.hash(senha, 10);

  const criado = await db.user.create({
    data: {
      nome,
      idPerfil,
      matricula,
      idCarteira,
      senha: passwordHash,
    },
  });

  return res.status(201).json({
    user: criado,
  });
}
