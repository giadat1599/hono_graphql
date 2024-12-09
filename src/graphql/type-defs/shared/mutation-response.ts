import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const MutationResponse = new GraphQLObjectType({
  name: "MutationResponse",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean), description: "Indicates whether the mutation is successful or not." },
    errors: { type: new GraphQLList(GraphQLString), description: "Validation errors if any" },
  },
});
