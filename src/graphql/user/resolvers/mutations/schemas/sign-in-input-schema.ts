import { z } from "zod";

export const signInInputSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters" })
    .max(31, { message: "username must be at most 31 characters" }),
  password: z.string().min(3, { message: "password must be at least 3 characters" }).max(255, { message: "password must be at most 255 characters" }),
});
