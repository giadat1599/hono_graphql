import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

export const CreatePostCommentInput = new GraphQLInputObjectType({
  name: "CreatePostCommentInput",
  fields: {
    postId: { type: new GraphQLNonNull(GraphQLInt) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  },
});
