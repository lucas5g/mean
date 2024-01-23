import { z } from "zod";

export const createWordSchema = z.object({
  name: z.string(),
  meaning: z.string(),
  fixed: z.boolean()
})

