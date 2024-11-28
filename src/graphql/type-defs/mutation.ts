import { GraphQLObjectType } from "graphql";

import * as authResolvers from "@/graphql/resolvers/auth/resolvers/mutations";

export const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authResolvers,
  },
});
