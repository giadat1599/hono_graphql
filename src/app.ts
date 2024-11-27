import { graphqlServer } from "@hono/graphql-server";

import schema from "./graphql/schemas";
import createApp from "./lib/create-app";

const app = createApp();

app.use("*", async (c, next) => {
  c.set("user", "dat");
  await next();
});

app.use(
  "/graphql",
  graphqlServer({
    schema,
    graphiql: true,
  }),
);

export default app;
