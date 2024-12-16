import { type InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { commentTable } from "./comment";
import { userTable } from "./user";

export const postTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").notNull().references(() => userTable.id, { onDelete: "set null" }),
  title: text("title").notNull(),
  url: text("url"),
  content: text("content"),
  points: integer("point").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
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

export const postRelation = relations(postTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [postTable.authorId],
    references: [userTable.id],
    relationName: "author",
  }),
  comments: many(commentTable, {
    relationName: "postComments",
  }),
}));

export type Post = InferSelectModel<typeof postTable>;
