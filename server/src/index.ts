import fastify from 'fastify';
import cors from '@fastify/cors';
// import { z } from 'zod';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from './utils/prisma';

const app = fastify();
app.register(cors);

app.get('/api', async () => {
  return await prisma.word.findMany();
});

// app.get('/:id', async (req, res) => {
//   res.json(
//     await prisma.word.findFirst({
//       where: {
//         id: req.params.id,
//       },
//     }),
//   );
// });

// app.post('/', async (req, res) => {
//   const data = z
//     .object({
//       name: z.string(),
//       meaning: z.string(),
//       fixed: z.boolean(),
//     })
//     .parse(req.body);

//   res.status(201).json(
//     await prisma.word.create({
//       data,
//     }),
//   );
// });

// app.delete('/:id', async (req, res) => {
//   res.status(204).json(
//     await prisma.word.delete({
//       where: {
//         id: req.params.id,
//       },
//     }),
//   );
// });

// app.use((error: Error, _: Request, res: Response) => {
//   if (error instanceof PrismaClientKnownRequestError) {
//     console.log('erro prisma');
//   }
//   res.json({ msg: 'Erro app' });
// });

// app.listen({
//   port: 8000,
//   host:'0.0.0.0'
// }).then(() => console.log('Server run http://localhost:8000/api'))
export default async (req: Request, res: Response) => {
  await app.ready();
  app.server.emit('request', req, res);
};

// app.listen(8000, () => console.log('💻 HTTP SERVER RUNNING!'));
