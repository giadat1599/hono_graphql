import { eq } from "drizzle-orm";
import { GraphQLNonNull } from "graphql";
import { deleteCookie, setCookie } from "hono/cookie";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { type User, userTable } from "@/db/schemas";
import { type MutationResponse, MutationResponseType } from "@/graphql/type-defs/shared/response";
import { COOKIE_NAME } from "@/lib/constants";
import { createSession, generateSessionToken, invalidateSession } from "@/lib/session";
import { validator } from "@/lib/utils/validator";

import { type SignInInput, signInInputSchema, SignInInputType } from "./inputs/signin-input";
import { type SignUpInput, signUpInputSchema, SignUpInputType } from "./inputs/signup-input";

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
    await createSession(sessionToken, user.id);

    setCookie(ctx, COOKIE_NAME, sessionToken);

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
    await createSession(sessionToken, user.id);

    setCookie(ctx, COOKIE_NAME, sessionToken);

    return {
      success: true,
      errors: [],
    };
  },
};

export const logOut: GraphqlResolver<{ input: string }, User> = {
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
