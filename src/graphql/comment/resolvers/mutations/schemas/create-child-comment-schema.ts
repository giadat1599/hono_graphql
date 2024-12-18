import { z } from "zod";

export const createChildCommentInputSchema = z.object({
  parentCommentId: z.number({
    required_error: "parentCommentId is required",
  }),
  content: z.string().min(1, { message: "content is required" }),
});
