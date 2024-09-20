import express, { Request, Response } from 'express'
import { routes } from './src/routes';

const server = express();

server.use(express.json());

const headsets: {
  color: string;
  marca: string;
}[] = [];

server.get('/', (request: Request, response: Response) => {
  response.json({
    status: 'ok'
  })
});

server.use(routes)

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});