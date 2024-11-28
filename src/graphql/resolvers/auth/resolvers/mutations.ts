import { eq } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";
import { setCookie } from "hono/cookie";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { type MutationResponse, MutationResponseType } from "@/graphql/type-defs/shared/response";
import { createSession, generateSessionToken } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

import { type SignInInput, signInInputSchema, SignInInputType } from "./inputs/signin-input";
import { type SignUpInput, signUpInputSchema, SignUpInputType } from "./inputs/signup-input";

const COOKIE_NAME = "hono_graphql";

export const signIn: GraphqlResolver<{ input: SignInInput }> = {
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
    const session = await createSession(sessionToken, user.id);

    setCookie(ctx, COOKIE_NAME, session.id);

    return {
      success: true,
      errors: [],
    };
  },
};

export const signUp: GraphqlResolver<{ input: SignUpInput }> = {
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
    const session = await createSession(sessionToken, user.id);

    setCookie(ctx, COOKIE_NAME, session.id);

    return {
      success: true,
      errors: [],
    };
  },
};
