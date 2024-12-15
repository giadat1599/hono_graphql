import { GraphQLNonNull } from "graphql";
import { deleteCookie } from "hono/cookie";

import type { Mutation } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import { MutationResponse } from "@/graphql/shared/type-defs/mutation-response";
import { COOKIE_NAME } from "@/lib/constants";
import { invalidateSession } from "@/lib/session";

const logOut: GraphqlResolver = {
  type: new GraphQLNonNull(MutationResponse),
  async resolve(_parent, _args, ctx): Promise<Mutation["logout"]> {
    const session = ctx.get("session");
    if (!session) {
      ctx.status(401);
      return {
        success: false,
        errors: ["Unauthenticated"],
      };
    }

    await invalidateSession(session.id);
    deleteCookie(ctx, COOKIE_NAME);
    return {
      success: true,
      errors: [],
    };
  },
};

export default logOut;
