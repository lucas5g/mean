import { z } from 'zod';

export const wordCreateSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  meaning: z.string(),
});

export type WordCreateType = z.infer<typeof wordCreateSchema>;
