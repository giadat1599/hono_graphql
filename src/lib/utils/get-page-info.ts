import type { PageInfo } from "@/graphql/__generated.ts";

import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export function getPageInfo(items: { id: number }[], limit: number = DEFAULT_PAGE_SIZE): PageInfo {
  return {
    endCursor: items.length > limit ? items[limit - 1].id.toString() : null,
    hasNextPage: items.length > limit,
  };
}
