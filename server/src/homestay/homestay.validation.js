import { z } from 'zod';

const homestaySchema = z.object({
  name: z.string(),
  open: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, {
    message: 'Time must be in HH:MM format',
  }),
  close: z.string().regex(/^([0-9]{2}):([0-9]{2})$/, {
    message: 'Time must be in HH:MM format',
  }),
  geom: z.any(),
});

export { homestaySchema };
