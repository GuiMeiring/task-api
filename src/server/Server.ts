import express from 'express';
import 'dotenv/config';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import * as routes from './routes';

const server = express();

server.use(express.json()); //Server vai fazer o uso do json nas rotas que é enviado req no body

server.get('/', (req, res) =>{
    res.status(StatusCodes.OK).send('Hello Word');
})

const prisma = new PrismaClient();

const combinedRouter = express.Router()
  .use(routes.taskRouter);

server.use(combinedRouter);

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export {server};