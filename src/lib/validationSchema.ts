import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }),
  description: z
    .string()
    .min(1, { message: 'Project description is required' }),
  connectionString: z
    .string()
    .min(1, { message: 'Connection string is required' }),
});

export const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const signinSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
