import express from 'express';
import { routes } from './src/routes';

const server = express();

server.use(express.json());

server.use(routes);

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
