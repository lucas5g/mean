import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { ZodError, z } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export const app = fastify();

app.setErrorHandler((error, request, reply) => {
  if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }

  if (error instanceof ZodError) {
    reply.status(422).send(error.errors);
  }

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      reply.status(422).send({ message: 'Já foi cadastrado essa palavra.' });
    }

    if (error.code === 'P2025') {
      reply.status(401).send({
        statusCode: 401,
        message: 'Não encontrado.',
      });
    }

    console.log(error);
  }

  reply.status(500).send(error);
});

app.get('/', () => {
  return prisma.word.findMany();
});

app.post('/', async (request, reply) => {
  const data = z
    .object({
      name: z.string(),
      meaning: z.string(),
    })
    .parse(request.body);

  const mean = await prisma.word.create({
    data,
  });

  reply.status(201).send(mean);
});

app.delete('/:id', async (request, reply) => {
  const { id } = z
    .object({
      id: z.string().uuid(),
    })
    .parse(request.params);

  await prisma.word.delete({
    where: { id },
  });

  reply.status(204);
});

app
  .listen({
    port: 8000,
    host: '0.0.0.0',
  })
  .then(() => console.log('\n💻 HTTP server running!'))
  .catch((error) => console.log(error));
