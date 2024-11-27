import { Router } from 'express';
import cors from 'cors';

import * as UserController from './controllers/user-controller';
import * as PedidoController from './controllers/pedido-controller';
import * as PerfilController from './controllers/perfil-controller';
import * as FilialController from './controllers/filial-controller';
import * as CarteiraController from './controllers/carteira-controller';
import * as LoginController from './controllers/login-controller';
import * as MaloteController from './controllers/malote-controller';
import * as DashboardController from './controllers/dashboard-controller';
import { LoginMiddleware } from './middlewares/login-middleware';

export const routes = Router();

routes.use(cors());

routes.post('/login', LoginController.create);

routes.use(LoginMiddleware);

routes.post('/filial', FilialController.create);
routes.get('/filial', FilialController.index);
routes.put('/filial/:id', FilialController.update);
routes.delete('/filial/:id', FilialController.destroy);

routes.post('/carteira', CarteiraController.create);
routes.get('/carteira', CarteiraController.index);
routes.delete('/carteira/:id', CarteiraController.destroy);

routes.post('/user', UserController.create);
routes.get('/user', UserController.index);
routes.get('/user/me', UserController.show);
routes.delete('/user/:id', UserController.destroy);

routes.post('/perfil', PerfilController.create);
routes.get('/perfil', PerfilController.index);

routes.post('/malote', MaloteController.create);
routes.get('/malote', MaloteController.list);
routes.put('/malote/:id', MaloteController.update);
routes.delete('/malote/:id', MaloteController.destroy);

routes.post('/pedido', PedidoController.create);
routes.get('/pedido', PedidoController.index);
routes.delete('/pedido/:id', PedidoController.destroy);
routes.put('/pedido/:id', PedidoController.update);

routes.get('/dashboard', DashboardController.index);
