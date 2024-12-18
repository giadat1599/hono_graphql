import { eq, sql } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";

import type { Mutation, MutationCreatePostCommentArgs, Post } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { commentTable, postTable } from "@/db/schemas";
import { Comment } from "@/graphql/comment/type-defs/comment";
import { mutationResponseType } from "@/graphql/shared/type-defs/mutation-response";
import { validator } from "@/lib/utils/validator";

import { CreatePostCommentInput } from "../../type-defs/inputs/create-post-comment-input";
import { createPostCommentInputSchema } from "./schemas/create-post-comment-schema";

const createPostComment: GraphqlResolver<MutationCreatePostCommentArgs> = {
  type: mutationResponseType(Comment, "CreatePostCommentPayload"),
  args: { input: { type: new GraphQLNonNull(CreatePostCommentInput) } },
  async resolve(_parent, args, ctx): Promise<Mutation["createPostComment"]> {
    const user = ctx.get("user");
    if (!user) {
      ctx.status(401);
      return {
        comment: null,
        success: false,
        errors: ["Unauthenticated"],
      };
    }
    const [data, errors] = validator(createPostCommentInputSchema, args.input);
    if (errors.length !== 0) {
      ctx.status(400);
      return {
        comment: null,
        success: false,
        errors,
      };
    }

    const [comment] = await db.transaction(async (tx) => {
      await tx.update(postTable).set({
        commentCount: sql`${postTable.commentCount} + 1`,
      }).where(eq(postTable.id, data.postId));

      return await tx.insert(commentTable).values({
        ...data,
        authorId: user.id,
      }).returning();
    });

    return {
      comment: { ...comment, post: {} as Post },
      success: true,
      errors: [],
    };
  },
};

export default createPostComment;
