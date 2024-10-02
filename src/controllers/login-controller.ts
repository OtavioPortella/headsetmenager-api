import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database';

export async function create(req: Request, res: Response) {
  const { matricula, senha } = req.body;

  const user = await db.user.findUnique({
    where: {
      matricula,
    },
  });

  if (!user) {
    return res.status(401).json({
      erro: 'Usuário ou senha incorretos',
    });
  }

  const isValidPass = await bcrypt.compare(senha, user.senha);

  if (!isValidPass) {
    return res.status(401).json({
      erro: 'Usuário ou senha incorretos',
    });
  }

  return res.json({
    user,
  });
}
