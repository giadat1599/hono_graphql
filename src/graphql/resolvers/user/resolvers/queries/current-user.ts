import type { Query } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import { User } from "@/graphql/type-defs/user/user";

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
