import { GraphQLObjectType } from "graphql";

import * as userResolvers from "../schemas/user/resolvers/queries";

export const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userResolvers,
  },
});
