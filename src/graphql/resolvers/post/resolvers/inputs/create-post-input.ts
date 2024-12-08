import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { z } from "zod";

export const CreatePostInputType = new GraphQLInputObjectType({
  name: "CreatePostInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: GraphQLString },
    content: { type: GraphQLString },
  },
});

export const createPostInputSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  url: z.string().optional(),
  content: z.string().optional(),
});
export type CreatePostInput = z.infer<typeof createPostInputSchema>;
