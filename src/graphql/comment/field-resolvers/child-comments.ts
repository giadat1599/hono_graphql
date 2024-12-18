import { eq } from "drizzle-orm";
import { GraphQLList } from "graphql";

import type { Comment, Post } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { commentTable } from "@/db/schemas";
import { Comment as CommentType } from "@/graphql/comment/type-defs/comment";

export const childComments: GraphqlResolver<any, Comment> = {
  get type() { return new GraphQLList(CommentType); },
  async resolve(parent): Promise<Comment["childComments"]> {
    if (!parent.id) {
      return null;
    }
    // TODO: should handle pagination together with orderBy
    const comments = await db.select().from(commentTable).where(eq(commentTable.parentCommentId, parent.id));

    return comments.map(comment => ({ ...comment, post: {} as Post }));
  },
};
