import { Router } from 'express';

import * as UserController from './controllers/user-controller';
import * as PerfilController from './controllers/perfil-controller';
import * as FilialController from './controllers/filial-controller';
import * as CarteiraController from './controllers/carteira-controller';
import * as LoginController from './controllers/login-controller';

export const routes = Router();

routes.post('/filial', FilialController.create);

routes.post('/carteira', CarteiraController.create);

routes.post('/user', UserController.create);

routes.post('/perfil', PerfilController.create);

routes.post('/login', LoginController.create);
