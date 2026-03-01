import { z } from "zod";

export interface LoginSchemaMsgs {
  usernameRequired: string;
  passwordRequired: string;
}

export function createLoginSchema(msgs: LoginSchemaMsgs) {
  return z.object({
    username: z.string().min(1, msgs.usernameRequired),
    password: z.string().min(1, msgs.passwordRequired),
  });
}

export type LoginFormValues = {
  username: string;
  password: string;
};
