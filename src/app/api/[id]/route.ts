import { prisma } from '@/libs/prisma';

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
