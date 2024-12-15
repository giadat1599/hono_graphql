import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const SignUpInput = new GraphQLInputObjectType({
  name: "SignUpInput",
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});
