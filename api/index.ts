import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
const app = fastify()

app.get('/api', async () => {
  const prisma = new PrismaClient()
  return await prisma.word.findMany();
});

// app.delete('/:id', async (req, res) => {
//   const prisma = new PrismaClient()

//   const { id } = req.params

//   res.status(204).send(
//     await prisma.word.delete({
//       where: {
//         id: String(req.params.id),
//       },
//     }),
//   );
// });

export default async (req: Request, res: Response) => {
  await app.ready();
  app.server.emit('request', req, res);
}