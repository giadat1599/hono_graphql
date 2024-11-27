import type { Context } from "hono";

export interface AppBindings {
  Variables: {
    user: string;
  };
}

export type AppContext = Context<AppBindings>;
