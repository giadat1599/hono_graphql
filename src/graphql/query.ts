import { GraphQLObjectType } from "graphql";

import * as postResolvers from "@/graphql/post/resolvers/queries";
import * as userResolvers from "@/graphql/user/resolvers/queries";

export const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userResolvers,
    ...postResolvers,
  },
});
