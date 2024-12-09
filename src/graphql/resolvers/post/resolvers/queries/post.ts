import { eq } from "drizzle-orm";
import { GraphQLInt, GraphQLNonNull } from "graphql";

import type { Query, QueryPostArgs } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { Post } from "@/graphql/type-defs/post/post";

const post: GraphqlResolver<QueryPostArgs> = {
  type: Post,
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(_parent, args, ctx): Promise<Query["post"]> {
    const [post] = await db.select().from(postTable).where(eq(postTable.id, args.id)).limit(1);

    if (!post) {
      ctx.status(404);
      return null;
    }

    return post;
  },
};

export default post;
