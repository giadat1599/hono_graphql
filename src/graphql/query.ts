import { GraphQLObjectType } from "graphql";

import * as commentResolvers from "@/graphql/comment/resolvers/queries";
import * as postResolvers from "@/graphql/post/resolvers/queries";
import * as userResolvers from "@/graphql/user/resolvers/queries";

export const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...userResolvers,
    ...postResolvers,
    ...commentResolvers,
  },
});
