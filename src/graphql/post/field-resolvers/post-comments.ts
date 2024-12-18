import { eq } from "drizzle-orm";
import { GraphQLList } from "graphql";

import type { Comment, Post } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { commentTable } from "@/db/schemas";
import { Comment as CommentType } from "@/graphql/comment/type-defs/comment";

export const postComments: GraphqlResolver<any, Post> = {
  type: new GraphQLList(CommentType),
  async resolve(parent): Promise<Omit<Comment, "post">[]> {
    const comments = await db.select().from(commentTable).where(eq(commentTable.postId, parent.id)).limit(2);
    return comments;
  },
};
