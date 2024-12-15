import { eq } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";
import { setCookie } from "hono/cookie";

import type { Mutation, MutationSignInArgs } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { MutationResponse } from "@/graphql/shared/type-defs/mutation-response";
import { SignInInput } from "@/graphql/user/type-defs/inputs/signin-input";
import { COOKIE_NAME } from "@/lib/constants";
import { createSession, generateSessionToken } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

import { signInInputSchema } from "./schemas/sign-in-input-schema";

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
