import { prisma } from '@/libs/prisma';
import { z } from 'zod';

export function GET() {
  return Response.json(prisma.word.findMany());
}

export function POST(request: Request) {
  const data = z
    .object({
      name: z.string(),
      meaning: z.string(),
    })
    .parse(request.body);

  return Response.json(data);
}
