import { eq } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";
import { setCookie } from "hono/cookie";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { type SignInInput, signInInputSchema, SignInInputType } from "@/graphql/resolvers/auth/resolvers/inputs/signin-input";
import { type MutationResponse, MutationResponseType } from "@/graphql/type-defs/shared/response";
import { COOKIE_NAME } from "@/lib/constants";
import { createSession, generateSessionToken } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

const signIn: GraphqlResolver<{ input: SignInInput }> = {
  type: new GraphQLNonNull(MutationResponseType),
  args: { input: { type: new GraphQLNonNull(SignInInputType) } },
  async resolve(_, args, ctx): Promise<MutationResponse> {
    const [data, errors] = validator(signInInputSchema, args.input);

    if (errors.length !== 0) {
      return {
        success: false,
        errors,
      };
    }

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, data.username),
    });

    if (!user) {
      return {
        success: false,
        errors: ["username or password is incorrect"],
      };
    }

    const isValidPassword = await Bun.password.verify(data.password, user.password);

    if (!isValidPassword) {
      return {
        success: false,
        errors: ["username or password is incorrect"],
      };
    }

    const sessionToken = generateSessionToken();
    await createSession(sessionToken, user.id);

    setCookie(ctx, COOKIE_NAME, sessionToken);

    return {
      success: true,
      errors: [],
    };
  },
};

export default signIn;
