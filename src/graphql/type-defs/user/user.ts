import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

import type { User as UserSchema } from "@/db/schemas";

import { DateISOStringScalar } from "../scalar-types/date-iso-string";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    createdAt: { type: DateISOStringScalar },
    updatedAt: { type: DateISOStringScalar },
  },
});

export type User = Omit<UserSchema, "password">;
