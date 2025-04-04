import { z } from 'zod';

const adminSchema = z.object({
  username: z.string().min(3).max(30),
  email: z
    .string()
    .email()
    .refine((value) => value.endsWith('@gmail.com'), {
      message: 'Please enter a valid email address with Gmail domain.',
    }),
});

export { adminSchema };
