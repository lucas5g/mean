import { z } from "zod";

export const createWordSchema = z.object({
  name: z.string(),
  meaning: z.string(),
  fixed: z.boolean()
})

export const updateWordSchema = createWordSchema.partial()

export const paramsSchema = z.object({
  id: z.coerce.number()
})