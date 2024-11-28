import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { z } from "zod";

export const SignUpInputType = new GraphQLInputObjectType({
  name: "SignUpInput",
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const signUpInputSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters" })
    .max(31, { message: "username must be at most 31 characters" }),
  password: z.string().min(3, { message: "password must be at least 3 characters" }).max(255, { message: "password must be at most 255 characters" }),
});

export type SignUpInput = z.infer<typeof signUpInputSchema>;
