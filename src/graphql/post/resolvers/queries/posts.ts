import { count, gt } from "drizzle-orm";

import type { Query, QueryPostsArgs } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { Post } from "@/graphql/post/type-defs/post";
import { paginatedResultType, paginationArgs } from "@/graphql/shared/type-defs/pagination";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getPageInfo } from "@/lib/utils/get-page-info";

const posts: GraphqlResolver<QueryPostsArgs> = {
  type: paginatedResultType(Post),
  args: paginationArgs,
  async resolve(_parent, args): Promise<Omit<Query["posts"], "comments">> {
    const nextCursor = args.nextCursor;
    const pageSize = args.limit ?? DEFAULT_PAGE_SIZE;
    const [totalCount] = await db.select({ count: count() }).from(postTable);
    // TODO: should handle pagination together with orderBy
    const posts = await db.select().from(postTable).where(nextCursor ? gt(postTable.id, Number.parseInt(nextCursor)) : undefined).limit(pageSize + 1);
    return {
      data: posts.slice(0, pageSize),
      totalCount: totalCount.count,
      pageInfo: getPageInfo(posts, pageSize),
    };
  },
};

export default posts;
