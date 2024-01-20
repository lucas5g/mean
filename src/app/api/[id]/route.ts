import { handleError } from "@/app/api/error"
import { prisma } from "@/libs/prisma"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  try {


    await prisma.word.delete({
      where: {
        id: params.id
      }
    })

    return new Response(null, {
      status: 200
    })
  }catch(error){
    return new Response(JSON.stringify({message: 'Não foi possível deletar.'}), {status: 401})
  }
}
