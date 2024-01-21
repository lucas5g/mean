import express, { NextFunction, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient()

const app = express()

app.get('/', async (req, res) => {
  res.json(await prisma.word.findMany())
})

app.post('/', async (req, res) => {
  const data = z.object({
    name: z.string(),
    meaning: z.string(),
    fixed: z.boolean()
  }).parse(req.body)

  res
    .status(201)
    .json(await prisma.word.create({
      data
    }))
})

app.delete('/:id', async(req, res) => {
  res 
    .status(204)
    .json(await prisma.word.delete({
      where:{
        id: req.params.id
      }
    }))
})


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ msg: 'qweqwew' })
})

app.listen(8000, () => console.log('HTTP SERVER RUNNING!'))