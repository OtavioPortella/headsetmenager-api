import { Router } from 'express';

import * as UserController from './controllers/user-controller';
import * as PerfilController from './controllers/perfil-controller';
import * as FilialController from './controllers/filial-controller';
import * as CarteiraController from './controllers/carteira-controller';

export const routes = Router();

const valid_user = 'test';
const valid_pass = '@Test1';

routes.post('/login', (request, response) => {
  if (
    request.body.user !== valid_user ||
    request.body.password !== valid_pass
  ) {
    return response.status(401).json({
      error: 'Dados incorretos',
    });
  }

  return response.json({
    message: 'Login efetuado com sucesso',
  });
});

routes.post('/filial', FilialController.create);

routes.post('/carteira', CarteiraController.create);

routes.post('/user', UserController.create);

routes.post('/perfil', PerfilController.create);
