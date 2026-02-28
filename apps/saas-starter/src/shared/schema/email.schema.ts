import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export interface EmailSchemaMsgs {
  required: string;
  tooLong: string;
  invalid: string;
}

export function createEmailSchema(msgs: EmailSchemaMsgs) {
  return z
    .string()
    .trim()
    .toLowerCase()
    .min(1, msgs.required)
    .max(254, msgs.tooLong)
    .refine((val) => emailRegex.test(val), { message: msgs.invalid })
    .refine((val) => !val.startsWith('.'), { message: msgs.invalid })
    .refine((val) => !val.endsWith('.'), { message: msgs.invalid })
    .refine((val) => !val.includes('..'), { message: msgs.invalid });
}
