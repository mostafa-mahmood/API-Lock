import { z } from 'zod';

export const generateRequestSchema = z.object({
          userId: z.string().min(1),
          scopes: z.array(z.string()),
          expiresAt: z.string().datetime().transform((val) => new Date(val)).optional(),
          isOneTime: z.boolean()
});