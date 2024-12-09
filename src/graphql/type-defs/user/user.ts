import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

import { DateISOStringScalar } from "../scalar-types/date-iso-string";

export const User = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    createdAt: { type: DateISOStringScalar },
    updatedAt: { type: DateISOStringScalar },
  },
});
