import { count, gt } from "drizzle-orm";

import type { Query, QueryPostsArgs } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { Post } from "@/graphql/type-defs/post/post";
import { paginatedResultType, paginationArgs } from "@/graphql/type-defs/shared/pagination";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getPageInfo } from "@/lib/utils/get-page-info";

const posts: GraphqlResolver<QueryPostsArgs> = {
  type: paginatedResultType(Post),
  args: paginationArgs,
  async resolve(_parent, args): Promise<Query["posts"]> {
    const nextCursor = args.nextCursor;
    const limit = args.limit ?? DEFAULT_PAGE_SIZE;
    const [totalCount] = await db.select({ count: count() }).from(postTable);
    const posts = await db.select().from(postTable).where(nextCursor ? gt(postTable.id, Number.parseInt(nextCursor)) : undefined).limit((limit || 10) + 1);
    return {
      data: posts.slice(0, limit),
      totalCount: totalCount.count,
      pageInfo: getPageInfo(posts, limit),
    };
  },
};

export default posts;
