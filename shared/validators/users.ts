import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  age: z.number().min(1).max(120),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email is too long'),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});
