import { z } from 'zod';

export const HealthSchema = z.object({
  ok: z.boolean(),
  services: z.array(z.string()),
  message: z.string().optional(),
});

export type Health = z.infer<typeof HealthSchema>;
