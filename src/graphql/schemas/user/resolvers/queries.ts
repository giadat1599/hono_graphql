import type { GraphQLFieldConfig } from "graphql";

import type { AppContext } from "@/app-context";

import { User } from "../user";

export const currentUser: GraphQLFieldConfig<any, AppContext, any> = {
  type: User,
  resolve: () => ({
    id: 1,
    username: "dat.truong",
  }),
};
