import { z } from "zod";

export const createPostInputSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  url: z.string().optional(),
  content: z.string().optional(),
});
