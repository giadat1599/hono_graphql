import { Hono } from "hono";

import type { AppBindings } from "@/app-context";

export default function createApp() {
  const app = new Hono<AppBindings>();
  return app;
}
