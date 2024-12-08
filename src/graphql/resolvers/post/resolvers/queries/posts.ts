import { GraphQLList } from "graphql";

import type { Post } from "@/db/schemas";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { PostType } from "@/graphql/type-defs/post/post";

const posts: GraphqlResolver = {
  type: new GraphQLList(PostType),
  async resolve(_parent, _args): Promise<Post[]> {
    const posts = await db.query.postTable.findMany();
    return posts;
  },
};

export default posts;
