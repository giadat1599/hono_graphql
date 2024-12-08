import { GraphQLObjectType } from "graphql";

import * as authResolvers from "@/graphql/resolvers/auth/resolvers/mutations";
import * as postResolvers from "@/graphql/resolvers/post/resolvers/mutations";

export const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authResolvers,
    ...postResolvers,
  },
});
