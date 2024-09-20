import { Router } from "express";

export const routes = Router();

const valid_user = 'test';
const valid_pass = '@Test1';

routes.post('/login', (request, response) => {
  if (request.body.user !== valid_user || request.body.password !== valid_pass) {
    return response.status(401).json({
      error: 'Dados incorretos'
    });
  }

  return response.json({
    message: 'Login efetuado com sucesso'
  })
});
