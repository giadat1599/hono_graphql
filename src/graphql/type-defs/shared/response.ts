import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const MutationResponseType = new GraphQLObjectType({
  name: "Response",
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    errors: { type: new GraphQLList(GraphQLString), description: "Validation errors if any" },
  },
});

export interface MutationResponse {
  success: boolean;
  errors: string[];
}
