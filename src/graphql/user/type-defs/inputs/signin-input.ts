import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const SignInInput = new GraphQLInputObjectType({
  name: "SignInInput",
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});
