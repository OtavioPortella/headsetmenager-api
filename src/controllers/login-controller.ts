import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../database';
import jwt from 'jsonwebtoken';

export async function create(req: Request, res: Response) {
  const { matricula, senha } = req.body;

  const user = await db.user.findUnique({
    where: {
      matricula,
    },
  });

  if (!user) {
    return res.status(401).json({
      error: 'Usuário ou senha incorretos',
    });
  }

  const isValidPass = await bcrypt.compare(senha, user.senha);

  if (!isValidPass) {
    return res.status(401).json({
      error: 'Usuário ou senha incorretos',
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    },
  );

  return res.json({
    user,
    token,
  });
}
