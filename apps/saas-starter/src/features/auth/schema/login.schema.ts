import { z } from 'zod';
import { EmailSchema } from '@/shared/schema/email.schema';

export const loginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
