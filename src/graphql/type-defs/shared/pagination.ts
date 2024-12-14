import { GraphQLBoolean, type GraphQLFieldConfigArgumentMap, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const PageInfo = new GraphQLObjectType({
  name: "PageInfo",
  fields: {
    endCursor: { type: GraphQLString },
    hasNextPage: { type: GraphQLBoolean },
  },
});

export const paginationArgs: GraphQLFieldConfigArgumentMap = {
  nextCursor: { type: GraphQLString },
  limit: { type: GraphQLInt, defaultValue: 10 },
};

export function paginatedResultType(type: GraphQLObjectType): GraphQLObjectType {
  return new GraphQLObjectType({
    name: `Paginated${type.name}`,
    fields: {
      data: { type: new GraphQLList(type) },
      totalCount: { type: GraphQLInt },
      pageInfo: { type: PageInfo },
    },
  });
}
