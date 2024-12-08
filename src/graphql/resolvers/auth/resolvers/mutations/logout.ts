import { GraphQLNonNull } from "graphql";
import { deleteCookie } from "hono/cookie";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import { type MutationResponse, MutationResponseType } from "@/graphql/type-defs/shared/response";
import { COOKIE_NAME } from "@/lib/constants";
import { invalidateSession } from "@/lib/session";

const logOut: GraphqlResolver = {
  type: new GraphQLNonNull(MutationResponseType),
  async resolve(_parent, _args, ctx): Promise<MutationResponse> {
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
