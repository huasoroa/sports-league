import { z } from 'zod';

export const SeasonAddFormSchema = z.object({
  year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  divisions: z.array(
    z.object({
      name: z.string().min(1),
      level: z.number().min(1),
      promotionSpots: z.number().min(0),
      relegationSpots: z.number().min(0),
    }),
  ),
});
