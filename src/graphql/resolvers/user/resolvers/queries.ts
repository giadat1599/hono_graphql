import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import { type User, UserType } from "@/graphql/type-defs/user/user";

export const currentUser: GraphqlResolver = {
  type: UserType,
  async resolve(_parent, _args, ctx): Promise<User | null> {
    if (!ctx.get("user")) {
      ctx.status(401);
      return null;
    }

    const user = ctx.get("user")!;
    return user;
  },
};
