import { GraphQLObjectType } from "graphql";

import * as commentResolvers from "@/graphql/comment/resolvers/mutations";
import * as postResolvers from "@/graphql/post/resolvers/mutations";
import * as authResolvers from "@/graphql/user/resolvers/mutations";

export const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authResolvers,
    ...postResolvers,
    ...commentResolvers,
  },
});
