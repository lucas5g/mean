import { prisma } from '@/utils/prisma';
import { updateWordSchema } from '@/utils/schemas';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const data = updateWordSchema.parse(await req.json());

  const word = await prisma.word.update({
    where: {
      id: params.id,
    },
    data,
  });
  return Response.json(word);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.word.delete({
      where: {
        id: params.id,
      },
    });

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Não foi possível deletar.' }),
      { status: 401 },
    );
  }
}
