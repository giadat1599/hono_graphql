import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { postAuthor } from "@/graphql/post/field-resolvers/post-author";
import { DateISOStringScalar } from "@/graphql/shared/scalar-types/date-iso-string";

import { postComments } from "../field-resolvers/post-comments";

export const Post = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    authorId: { type: new GraphQLNonNull(GraphQLInt) },
    author: postAuthor,
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: GraphQLString },
    content: { type: GraphQLString },
    points: { type: new GraphQLNonNull(GraphQLInt) },
    commentCount: { type: new GraphQLNonNull(GraphQLInt) },
    comments: postComments,
    createdAt: { type: new GraphQLNonNull(DateISOStringScalar) },
    updatedAt: { type: new GraphQLNonNull(DateISOStringScalar) },
  },
});
