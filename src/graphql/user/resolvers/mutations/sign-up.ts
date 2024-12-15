import { GraphQLNonNull } from "graphql";
import { setCookie } from "hono/cookie";

import type { Mutation, MutationSignUpArgs } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { MutationResponse } from "@/graphql/shared/type-defs/mutation-response";
import { SignUpInput } from "@/graphql/user/type-defs/inputs/signup-input";
import { COOKIE_NAME } from "@/lib/constants";
import { createSession, generateSessionToken } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

import { signUpInputSchema } from "./schemas/sign-up-input-schema";

const signUp: GraphqlResolver<MutationSignUpArgs> = {
  type: new GraphQLNonNull(MutationResponse),
  args: { input: { type: new GraphQLNonNull(SignUpInput) } },
  async resolve(_, args, ctx): Promise<Mutation["signUp"]> {
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
