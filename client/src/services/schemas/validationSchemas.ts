import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(1, { message: 'Username is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
