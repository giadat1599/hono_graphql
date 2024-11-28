import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
  },
});
