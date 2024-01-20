import { prisma } from '@/libs/prisma';
import { z } from 'zod';

export async function GET() {
  return Response.json(await prisma.word.findMany());
}

export async function POST(req: Request) {
  const data = z
    .object({
      name: z.string(),
      meaning: z.string(),
    })
    .parse(await req.json());

  const word = await prisma.word.create({data})

  return  Response.json(word);
}

export async function DELETE(){
  return {msg: 1}
}

