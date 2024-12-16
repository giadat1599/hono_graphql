import { relations } from "drizzle-orm";
import { type AnyPgColumn, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

import { postTable } from "./post";
import { userTable } from "./user";

export const commentTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").references(() => userTable.id, { onDelete: "set null" }),
  postId: integer("post_id").notNull().references(() => postTable.id, { onDelete: "cascade" }),
  // self-reference issue: https://orm.drizzle.team/docs/indexes-constraints#foreign-key
  parentCommentId: integer("parent_comment_id").references((): AnyPgColumn => commentTable.id),
  content: text("content").notNull(),
  depth: integer("depth").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
  points: integer("points").default(0).notNull(),
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

export const commentRelation = relations(commentTable, ({ one, many }) => ({
  author: one(userTable, {
    fields: [commentTable.authorId],
    references: [userTable.id],
    relationName: "author",
  }),
  post: one(postTable, {
    fields: [commentTable.postId],
    references: [postTable.id],
    relationName: "postComments",
  }),
  parentComment: one(commentTable, {
    fields: [commentTable.parentCommentId],
    references: [commentTable.id],
    relationName: "childComments",
  }),
  childComments: many(commentTable, {
    relationName: "childComments",
  }),
}));
