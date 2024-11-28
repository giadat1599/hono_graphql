import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const GraphqlResponseType = new GraphQLObjectType({
  name: "Response",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    errors: { type: new GraphQLList(GraphQLString), description: "Validation errors if any" },
  },
});
