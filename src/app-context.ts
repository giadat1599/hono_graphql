import type { Context } from "hono";

import type { Session, User } from "./db/schemas";

export interface AppBindings {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}

export type AppContext = Context<AppBindings>;
