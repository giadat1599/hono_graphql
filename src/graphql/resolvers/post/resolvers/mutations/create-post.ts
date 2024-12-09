import { GraphQLNonNull } from "graphql";

import type { Mutation, MutationCreatePostArgs } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { postTable } from "@/db/schemas";
import { CreatePostInput, createPostInputSchema } from "@/graphql/resolvers/post/resolvers/inputs/create-post-input";
import { CreatePostInputResponse } from "@/graphql/type-defs/post/create-post-input-response";
import { validator } from "@/lib/utils/validator";

const createPost: GraphqlResolver<MutationCreatePostArgs> = {
  type: CreatePostInputResponse,
  args: { input: { type: new GraphQLNonNull(CreatePostInput) } },
  async resolve(_parent, args, ctx): Promise<Mutation["createPost"]> {
    const user = ctx.get("user");
    if (!user) {
      ctx.status(401);
      return {
        post: null,
        error: {
          success: false,
          errors: ["Unauthenticated"],
        },
      };
    }

    const [data, errors] = await validator(createPostInputSchema, args.input);

    if (errors.length !== 0) {
      return {
        post: null,
        error: { success: false, errors },
      };
    }

    const [post] = await db.insert(postTable).values({
      authorId: user.id,
      ...data,
    }).returning();

    return {
      post,
      error: null,
    };
  },
};

export default createPost;
