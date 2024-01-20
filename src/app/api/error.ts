import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const handleError = (error:any) => {
  if(!(error instanceof PrismaClientKnownRequestError)){
    return console.log(error)
  }
  // if(error.code === )
  
  console.log(error)
  return  'qweqwe'

}