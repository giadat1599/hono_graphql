import { type GraphQLFieldConfig, GraphQLNonNull } from "graphql";

import type { AppContext } from "@/app-context";

import { GraphqlResponseType } from "@/graphql/type-defs/shared/response";
import { flattenMapError } from "@/lib/utils/flatten-map-error";

import { type SignInInput, signInInputSchema, SignInInputType } from "./inputs/signin-input";
import { type SignUpInput, signUpInputSchema, SignUpInputType } from "./inputs/signup-input";

export const signIn: GraphQLFieldConfig<any, AppContext, { input: SignInInput }> = {
  type: new GraphQLNonNull(GraphqlResponseType),
  args: { input: { type: new GraphQLNonNull(SignInInputType) } },
  resolve(_, args) {
    const { success, error } = signInInputSchema.safeParse(args.input);
    if (!success) {
      return {
        success: false,
        errors: flattenMapError(error.flatten().fieldErrors),
      };
    }

    // TODO: logic for signing in

    return {
      success: true,
    };
  },
};

export const signUp: GraphQLFieldConfig<any, AppContext, { input: SignUpInput }> = {
  type: new GraphQLNonNull(GraphqlResponseType),
  args: { input: { type: new GraphQLNonNull(SignUpInputType) } },
  resolve(_, args) {
    const { success, error } = signUpInputSchema.safeParse(args.input);
    if (!success) {
      return {
        success: false,
        errors: flattenMapError(error.flatten().fieldErrors),
      };
    }

    // TODO: logic for signing up

    return {
      success: true,
    };
  },
};
