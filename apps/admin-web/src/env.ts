import { z } from 'zod';

const envSchema = z.object({
  VITE_GEMINI_API_KEY: z.string().min(1),
});

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(import.meta.env);
