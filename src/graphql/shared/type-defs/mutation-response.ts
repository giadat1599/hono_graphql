import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString, type ThunkObjMap } from "graphql";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

const fields: ThunkObjMap<GraphqlResolver> = {
  success: { type: new GraphQLNonNull(GraphQLBoolean), description: "Indicates whether the mutation is successful or not." },
  errors: { type: new GraphQLList(GraphQLString), description: "Validation errors if any" },
};

export const MutationResponse = new GraphQLObjectType({
  name: "MutationResponse",
  fields,
});

export function mutationResponseType(type: GraphQLObjectType, name: string): GraphQLObjectType {
  return new GraphQLObjectType({
    name,
    fields: {
      [type.name.toLowerCase()]: { type },
      ...fields,
    },
  });
}
