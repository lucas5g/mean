import express, { Request, Response } from 'express';
import 'express-async-errors';
import { z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from './utils/prisma';

const app = express();

app.get('/', async (_, res) => {
  res.json(await prisma.word.findMany());
});

app.get('/:id', async (req, res) => {
  res.json(
    await prisma.word.findFirstOrThrow({
      where: {
        id: req.params.id,
      },
    }),
  );
});

app.post('/', async (req, res) => {
  const data = z
    .object({
      name: z.string(),
      meaning: z.string(),
      fixed: z.boolean(),
    })
    .parse(req.body);

  res.status(201).json(
    await prisma.word.create({
      data,
    }),
  );
});

app.delete('/:id', async (req, res) => {
  res.status(204).json(
    await prisma.word.delete({
      where: {
        id: req.params.id,
      },
    }),
  );
});

app.use((error: Error, _: Request, res: Response) => {
  if (error instanceof PrismaClientKnownRequestError) {
    console.log('erro prisma');
  }
  res.json({ msg: 'qweqwew' });
});

app.listen(8000, () => console.log('💻 HTTP SERVER RUNNING!'));
