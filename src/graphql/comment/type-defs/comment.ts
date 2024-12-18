import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { childComments } from "@/graphql/comment/field-resolvers/child-comments";
import { commentAuthor } from "@/graphql/comment/field-resolvers/comment-author";
import { commentPost } from "@/graphql/comment/field-resolvers/comment-post";
import { DateISOStringScalar } from "@/graphql/shared/scalar-types/date-iso-string";

export const Comment = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: { type: GraphQLInt },
    authorId: { type: GraphQLInt },
    author: commentAuthor,
    postId: { type: new GraphQLNonNull(GraphQLInt) },
    post: commentPost,
    parentCommentId: { type: GraphQLInt },
    content: { type: GraphQLString },
    depth: { type: new GraphQLNonNull(GraphQLInt) },
    points: { type: new GraphQLNonNull(GraphQLInt) },
    commentCount: { type: new GraphQLNonNull(GraphQLInt) },
    childComments,
    createdAt: { type: new GraphQLNonNull(DateISOStringScalar) },
    updatedAt: { type: new GraphQLNonNull(DateISOStringScalar) },
  },
});
