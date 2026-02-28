import { z } from 'zod';
import { createEmailSchema, type EmailSchemaMsgs } from '@/shared/schema/email.schema';

export interface LoginSchemaMsgs {
  email: EmailSchemaMsgs;
  passwordRequired: string;
}

export function createLoginSchema(msgs: LoginSchemaMsgs) {
  return z.object({
    email: createEmailSchema(msgs.email),
    password: z.string().min(1, msgs.passwordRequired),
    rememberMe: z.boolean(),
  });
}

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};
