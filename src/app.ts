import { deleteCookie, getCookie } from "hono/cookie";

import { graphqlServer } from "@hono/graphql-server";

import schema from "./graphql/type-defs";
import { COOKIE_NAME } from "./lib/constants";
import createApp from "./lib/create-app";
import { validateSessionToken } from "./lib/session";

const app = createApp();

app.use("*", async (c, next) => {
  const sessionId = getCookie(c, COOKIE_NAME) ?? null;
  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  const { session, user } = await validateSessionToken(sessionId);

  if (!session) {
    deleteCookie(c, COOKIE_NAME);
  }

  c.set("user", user);
  c.set("session", session);

  return next();
});

app.use(
  "/graphql",
  graphqlServer({
    schema,
    graphiql: true,
  }),
);

export default app;
