import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function LoginMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const headers = req.headers;

    const auth = headers.authorization;

    if (!auth) {
      return res.status(401).json({
        error: 'Token requerido',
      });
    }

    const token = auth.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    console.log('decoded', decoded);

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({
      error: 'Token inválido',
    });
  }
}
