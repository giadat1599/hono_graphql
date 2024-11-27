import { GraphQLSchema } from "graphql";

import { rootQuery } from "./query";

const schema = new GraphQLSchema({
  query: rootQuery,
});
export default schema;
