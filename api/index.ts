import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import cors from '@fastify/cors';

export const app = fastify();
app.register(cors);

export const prisma = new PrismaClient();

app.get('/api', async () => {
  return await prisma.word.findMany({
    orderBy: [
      {
        fixed: 'desc',
      },
      {
        name: 'asc',
      },
    ],
  });
});

app.get('/api/:id', async (req) => {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(req.params);

  return await prisma.word.findFirst({
    where: { id },
  });
});

app.patch('/api/:id', async (req) => {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(req.params);

  const data = z
    .object({
      name: z.string(),
      meaning: z.string(),
      fixed: z.boolean(),
    })
    .partial()
    .parse(req.body);

  return await prisma.word.update({
    where: { id },
    data,
  });
});

app.post('/api', async (req) => {
  const data = z
    .object({
      name: z.string(),
      meaning: z.string(),
      fixed: z.boolean(),
    })
    .parse(req.body);

  return await prisma.word.create({
    data,
  });
});

app.delete('/api/:id', async (req, res) => {
  const { id } = z
    .object({
      id: z.coerce.number(),
    })
    .parse(req.params);

  res.status(204).send(
    await prisma.word.delete({
      where: { id },
    }),
  );
});

app.setErrorHandler((error, req, res) => {
  console.log(error);
  res.status(500).send({ msg: 'algum erro' });
});

app
  .listen({
    port: 8000,
  })
  .then(() => console.log('http://localhost:8000/api'));

export default async (req: Request, res: Response) => {
  await app.ready();
  app.server.emit('request', req, res);
};
