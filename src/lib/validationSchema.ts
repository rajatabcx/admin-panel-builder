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
