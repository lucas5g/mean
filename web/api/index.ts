import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
const app = fastify()

app.get('/api', async () => {
  const prisma = new PrismaClient()
  return await prisma.word.findMany();
});
export default async (req:Request, res:Response) => {
  await app.ready();
  app.server.emit('request', req, res);
}