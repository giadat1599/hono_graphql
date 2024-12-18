import { GraphQLNonNull } from "graphql";

import type { Mutation, MutationCreatePostArgs } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { CreatePostInput } from "@/graphql/post/type-defs/inputs/create-post-input";
import { Post } from "@/graphql/post/type-defs/post";
import { mutationResponseType } from "@/graphql/shared/type-defs/mutation-response";
import { validator } from "@/lib/utils/validator";

import { createPostInputSchema } from "./schemas/create-post-schema";

const createPost: GraphqlResolver<MutationCreatePostArgs> = {
  type: mutationResponseType(Post, "CreatePostPayload"),
  args: { input: { type: new GraphQLNonNull(CreatePostInput) } },
  async resolve(_parent, args, ctx): Promise<Mutation["createPost"]> {
    const user = ctx.get("user");
    if (!user) {
      ctx.status(401);
      return {
        post: null,
        success: false,
        errors: ["Unauthenticated"],
      };
    }

    const [data, errors] = await validator(createPostInputSchema, args.input);

    if (errors.length !== 0) {
      return {
        post: null,
        success: false,
        errors,
      };
    }

    const [post] = await db.insert(postTable).values({
      authorId: user.id,
      ...data,
    }).returning();

    return {
      post: { ...post, comments: [] },
      success: true,
      errors: null,
    };
  },
};

export default createPost;
