import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
export const app = fastify()

export const prisma = new PrismaClient()


app.get('/api', async () => {
  return await prisma.word.findMany();
});

app.get('/api/:id', async (req) => {

  const { id } = z.object({
    id: z.coerce.number()
  }).parse(req.params)

  return await prisma.word.findFirst({
    where: { id }
  })
})


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

app.listen({
  port: 8000
})

export default async (req: Request, res: Response) => {
  await app.ready();
  app.server.emit('request', req, res);
}