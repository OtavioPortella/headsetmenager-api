import { Router } from 'express';
import cors from 'cors';

import * as UserController from './controllers/user-controller';
import * as PedidoController from './controllers/pedido-controller';
import * as PerfilController from './controllers/perfil-controller';
import * as FilialController from './controllers/filial-controller';
import * as CarteiraController from './controllers/carteira-controller';
import * as LoginController from './controllers/login-controller';
import * as MaloteController from './controllers/malote-controller';
import { LoginMiddleware } from './middlewares/login-middleware';

export const routes = Router();

routes.use(cors());

routes.post('/login', LoginController.create);

routes.use(LoginMiddleware);

routes.post('/filial', FilialController.create);
routes.get('/filial', FilialController.index);

routes.post('/carteira', CarteiraController.create);

routes.post('/user', UserController.create);

routes.post('/perfil', PerfilController.create);

routes.post('/malote', MaloteController.create);

routes.post('/pedido', PedidoController.create);
routes.get('/pedido', PedidoController.index);
