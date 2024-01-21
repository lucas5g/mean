import { z } from 'zod';

export const createWordSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  meaning: z.string(),
  fixed: z.boolean(),
});

export const updateWordSchema = createWordSchema.partial();

export type CreateWordType = z.infer<typeof createWordSchema>;
