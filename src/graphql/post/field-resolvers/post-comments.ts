import { and, eq, isNull } from "drizzle-orm";
import { GraphQLList } from "graphql";

import type { Comment, Post } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { commentTable } from "@/db/schemas";
import { Comment as CommentType } from "@/graphql/comment/type-defs/comment";

export const postComments: GraphqlResolver<any, Post> = {
  get type() { return new GraphQLList(CommentType); },
  async resolve(parent): Promise<Omit<Comment, "post">[]> {
    // TODO: should handle pagination together with orderBy
    const comments = await db.select().from(commentTable).where(and(eq(commentTable.postId, parent.id), isNull(commentTable.parentCommentId))).limit(2);
    return comments;
  },
};
