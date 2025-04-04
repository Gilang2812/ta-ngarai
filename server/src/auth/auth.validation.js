import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z
    .string()
    .email()
    .refine((value) => value.endsWith('@gmail.com'), {
      message: 'Please enter a valid email address with Gmail domain.',
    }),
  password: z.string(),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export { loginSchema, registerSchema };
