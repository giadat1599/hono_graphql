import { eq } from "drizzle-orm";

import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { type Post, userTable } from "@/db/schemas";
import { type User, UserType } from "@/graphql/type-defs/user/user";

export const postAuthor: GraphqlResolver<any, Post> = {
  type: UserType,
  async resolve(parent): Promise<User | null> {
    const [user] = await db.select({
      id: userTable.id,
      username: userTable.username,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,

    }).from(userTable).where(eq(userTable.id, parent.authorId));

    return user;
  },
};
