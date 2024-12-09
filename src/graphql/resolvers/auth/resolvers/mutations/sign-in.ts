import { eq } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";
import { setCookie } from "hono/cookie";

import type { Mutation, MutationSignInArgs } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { SignInInput, signInInputSchema } from "@/graphql/resolvers/auth/resolvers/inputs/signin-input";
import { MutationResponse } from "@/graphql/type-defs/shared/mutation-response";
import { COOKIE_NAME } from "@/lib/constants";
import { createSession, generateSessionToken } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

const signIn: GraphqlResolver<MutationSignInArgs> = {
  type: new GraphQLNonNull(MutationResponse),
  args: { input: { type: new GraphQLNonNull(SignInInput) } },
  async resolve(_, args, ctx): Promise<Mutation["signIn"]> {
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
