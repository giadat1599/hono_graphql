import { eq, sql } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";

import type { Mutation, MutationCreateChildCommentArgs, Post } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { commentTable, postTable } from "@/db/schemas";
import { Comment as CommenType } from "@/graphql/comment/type-defs/comment";
import { mutationResponseType } from "@/graphql/shared/type-defs/mutation-response";
import { validator } from "@/lib/utils/validator";

import { CreateChildCommentInput } from "../../type-defs/inputs/create-child-comment-input";
import { createChildCommentInputSchema } from "./schemas/create-child-comment-schema";

const createChildComment: GraphqlResolver<MutationCreateChildCommentArgs> = {
  type: mutationResponseType(CommenType, "CreateChildCommentPayload"),
  args: { input: { type: new GraphQLNonNull(CreateChildCommentInput) } },
  async resolve(_parent, args, ctx): Promise<Mutation["createChildComment"]> {
    const user = ctx.get("user");
    if (!user) {
      ctx.status(401);
      return {
        comment: null,
        success: false,
        errors: ["Unauthenticated"],
      };
    }

    const [data, errors] = validator(createChildCommentInputSchema, args.input);

    if (errors.length !== 0) {
      ctx.status(400);
      return {
        comment: null,
        success: false,
        errors,
      };
    }

    const [childComment] = await db.transaction(async (tx) => {
      const [updatedParentComment] = await tx.update(commentTable).set({
        commentCount: sql`${commentTable.commentCount} + 1`,
      }).where(eq(commentTable.id, data.parentCommentId)).returning({ postId: commentTable.postId, depth: commentTable.depth });

      await tx.update(postTable).set({
        commentCount: sql`${postTable.commentCount} + 1`,
      }).where(eq(postTable.id, updatedParentComment.postId));

      return await tx.insert(commentTable).values({
        ...data,
        authorId: user.id,
        postId: updatedParentComment.postId,
        depth: updatedParentComment.depth + 1,
      }).returning();
    });

    return {
      comment: { ...childComment, post: {} as Post },
      success: true,
      errors: [],
    };
  },
};

export default createChildComment;
