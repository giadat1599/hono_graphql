import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { DateISOStringScalar } from "@/graphql/shared/scalar-types/date-iso-string";

import { commentAuthor } from "../field-resolvers/comment-author";
import { commentPost } from "../field-resolvers/comment-post";

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
    createdAt: { type: new GraphQLNonNull(DateISOStringScalar) },
    updatedAt: { type: new GraphQLNonNull(DateISOStringScalar) },
  },
});
