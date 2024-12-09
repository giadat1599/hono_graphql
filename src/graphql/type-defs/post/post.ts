import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

import { postAuthor } from "@/graphql/resolvers/post/field-resolvers/post-author";

import { DateISOStringScalar } from "../scalar-types/date-iso-string";

export const Post = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: { type: GraphQLInt },
    authorId: { type: GraphQLInt },
    author: postAuthor,
    title: { type: GraphQLString },
    url: { type: GraphQLString },
    content: { type: GraphQLString },
    points: { type: GraphQLInt },
    commentCount: { type: GraphQLInt },
    createdAt: { type: DateISOStringScalar },
    updatedAt: { type: DateISOStringScalar },
  },
});
