import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

export const CreateChildCommentInput = new GraphQLInputObjectType({
  name: "CreateChildCommentInput",
  fields: {
    parentCommentId: { type: new GraphQLNonNull(GraphQLInt) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});
