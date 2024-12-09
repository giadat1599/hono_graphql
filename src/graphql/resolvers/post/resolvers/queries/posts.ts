import { GraphQLList } from "graphql";

import type { Query } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { Post } from "@/graphql/type-defs/post/post";

const posts: GraphqlResolver = {
  type: new GraphQLList(Post),
  async resolve(_parent, _args): Promise<Query["posts"]> {
    const posts = await db.query.postTable.findMany();
    return posts;
  },
};

export default posts;
