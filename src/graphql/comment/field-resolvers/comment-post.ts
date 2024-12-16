import { eq } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";

import type { Comment, Maybe, Post } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { Post as PostType } from "@/graphql/post/type-defs/post";

export const commentPost: GraphqlResolver<any, Comment> = {
  get type() { return new GraphQLNonNull(PostType); },
  async resolve(parent): Promise<Maybe<Omit<Post, "comments">>> {
    const [post] = await db.select().from(postTable).where(eq(postTable.id, parent.postId));
    return post;
  },
};
