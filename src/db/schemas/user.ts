import { type InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { commentTable } from "./comment";
import { postTable } from "./post";

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

export const userRelation = relations(userTable, ({ many }) => ({
  posts: many(postTable, { relationName: "author" }),
  comments: many(commentTable, { relationName: "author" }),
}));

export type User = InferSelectModel<typeof userTable>;
