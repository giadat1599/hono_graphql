import { GraphQLObjectType } from "graphql";

import * as postResolvers from "@/graphql/resolvers/post/resolvers/queries";
import * as userResolvers from "@/graphql/resolvers/user/resolvers/queries";

export const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userResolvers,
    ...postResolvers,
  },
});
