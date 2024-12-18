import { z } from "zod";

export const createPostCommentInputSchema = z.object({
  postId: z.number({
    required_error: "postId is required",
  }),
  content: z.string().min(1, { message: "content is required" }),
});
