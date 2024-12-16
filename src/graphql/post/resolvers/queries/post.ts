import { eq } from "drizzle-orm";
import { GraphQLInt, GraphQLNonNull } from "graphql";

import type { Maybe, Post, QueryPostArgs } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { Post as PostType } from "@/graphql/post/type-defs/post";

const post: GraphqlResolver<QueryPostArgs> = {
  type: PostType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(_parent, args, ctx): Promise<Maybe<Omit<Post, "comments">>> {
    const [post] = await db.select().from(postTable).where(eq(postTable.id, args.id)).limit(1);
    if (!post) {
      ctx.status(404);
      return null;
    }

    return post;
  },
};

export default post;
