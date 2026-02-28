import { createEmailSchema, type EmailSchemaMsgs } from '@/shared/schema/email.schema';
import { z } from 'zod';

export interface ForgotPasswordSchemaMsgs {
  email: EmailSchemaMsgs;
}

export function createForgotPasswordSchema(msgs: ForgotPasswordSchemaMsgs) {
  return z.object({
    email: createEmailSchema(msgs.email),
  });
}

export type ForgotPasswordFormValues = {
  email: string;
};
