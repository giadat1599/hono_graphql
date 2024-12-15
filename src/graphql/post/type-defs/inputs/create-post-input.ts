import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";

export const CreatePostInput = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});
