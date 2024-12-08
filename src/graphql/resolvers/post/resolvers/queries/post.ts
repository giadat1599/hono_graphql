import { eq } from "drizzle-orm";
import { GraphQLInt, GraphQLNonNull } from "graphql";

import type { Post } from "@/db/schemas";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { PostType } from "@/graphql/type-defs/post/post";

const post: GraphqlResolver<{ id: number }> = {
  type: PostType,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(_parent, args, ctx): Promise<Post | null> {
    const [post] = await db.select().from(postTable).where(eq(postTable.id, args.id)).limit(1);

    if (!post) {
      ctx.status(404);
      return null;
    }

    return post;
  },
};

export default post;
