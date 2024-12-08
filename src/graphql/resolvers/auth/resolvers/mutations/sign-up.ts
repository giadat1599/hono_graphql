import { GraphQLNonNull } from "graphql";
import { setCookie } from "hono/cookie";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { type SignUpInput, signUpInputSchema, SignUpInputType } from "@/graphql/resolvers/auth/resolvers/inputs/signup-input";
import { type MutationResponse, MutationResponseType } from "@/graphql/type-defs/shared/response";
import { COOKIE_NAME } from "@/lib/constants";
import { createSession, generateSessionToken } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

const signUp: GraphqlResolver<{ input: SignUpInput }> = {
  type: new GraphQLNonNull(MutationResponseType),
  args: { input: { type: new GraphQLNonNull(SignUpInputType) } },
  async resolve(_, args, ctx): Promise<MutationResponse> {
    const [data, errors] = validator(signUpInputSchema, args.input);

    if (errors.length !== 0) {
      return {
        success: false,
        errors,
      };
    }
    const hashedPassword = await Bun.password.hash(data.password);

    const [user] = await db.insert(userTable).values({
      username: data.username,
      password: hashedPassword,
    }).returning({ id: userTable.id });

    const sessionToken = generateSessionToken();
    await createSession(sessionToken, user.id);

    setCookie(ctx, COOKIE_NAME, sessionToken);

    return {
      success: true,
      errors: [],
    };
  },
};

export default signUp;
