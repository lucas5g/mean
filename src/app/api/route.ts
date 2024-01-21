import { prisma } from '@/utils/prisma';
import { createWordSchema } from '@/utils/schemas';

export async function GET() {
  const data = await prisma.word.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  return Response.json(data);
}

export async function POST(req: Request) {
  try {
    const data = createWordSchema.parse(await req.json());

    const word = await prisma.word.create({ data });

    return Response.json(word);
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        message: 'Não foi possível registrar.',
      }),
      { status: 422 },
    );
  }
}

export async function DELETE() {
  return { msg: 1 };
}
