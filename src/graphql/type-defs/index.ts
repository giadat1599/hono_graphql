import { GraphQLSchema } from "graphql";

import { rootMutation } from "./mutation";
import { rootQuery } from "./query";

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
export default schema;
