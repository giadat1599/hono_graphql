import { GraphQLObjectType } from "graphql";

import { Post } from "@/graphql/type-defs/post/post";
import { MutationResponse } from "@/graphql/type-defs/shared/mutation-response";

export const CreatePostInputResponse = new GraphQLObjectType({
  name: "CreatePostInputResponse",
  fields: {
    post: { type: Post },
    error: { type: MutationResponse },
  },
});
