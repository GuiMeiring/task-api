import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const taskRouter = Router();

// Criar tarefa
taskRouter.post('/', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a tarefa' });
  }
});

// Listar todas as tarefas
taskRouter.get('/', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar as tarefas' });
  }
});

// Atualizar tarefa
taskRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { title, description, completed },
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a tarefa' });
  }
});

// Deletar tarefa
taskRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a tarefa' });
  }
});

export {taskRouter};