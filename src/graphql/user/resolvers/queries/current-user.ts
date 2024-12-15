import type { Query } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import { User } from "@/graphql/user/type-defs/user";

const currentUser: GraphqlResolver = {
  type: User,
  async resolve(_parent, _args, ctx): Promise<Query["currentUser"]> {
    if (!ctx.get("user")) {
      ctx.status(401);
      return null;
    }

    const user = ctx.get("user")!;
    return user;
  },
};

export default currentUser;
