import { z } from 'zod';

const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export const EmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Email is required')
  .max(254, 'Email is too long')
  .refine((val) => emailRegex.test(val), {
    message: 'Invalid email format',
  })
  .refine((val) => !val.startsWith('.'), {
    message: 'Invalid email format',
  })
  .refine((val) => !val.endsWith('.'), {
    message: 'Invalid email format',
  })
  .refine((val) => !val.includes('..'), {
    message: 'Invalid email format',
  });
