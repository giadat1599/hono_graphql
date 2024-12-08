import { GraphQLObjectType } from "graphql";

import type { Post } from "@/db/schemas";

import { PostType } from "@/graphql/type-defs/post/post";
import { type MutationResponse, MutationResponseType } from "@/graphql/type-defs/shared/response";

export const CreatePostInputResponseType = new GraphQLObjectType({
  name: "CreatePostInputResponse",
  fields: {
    post: { type: PostType },
    error: { type: MutationResponseType },
  },
});

export interface CreatePostInputResponse {
  post: Post | null;
  error: MutationResponse | null;
}
