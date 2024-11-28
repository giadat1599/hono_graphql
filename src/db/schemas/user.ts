import type { InferSelectModel } from "drizzle-orm";

import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export type User = InferSelectModel<typeof userTable>;
