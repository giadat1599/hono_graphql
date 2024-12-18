import { eq } from "drizzle-orm";

import type { Post, User } from "@/graphql/__generated.ts";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { User as UserType } from "@/graphql/user/type-defs/user";

export const postAuthor: GraphqlResolver<any, Post> = {
  type: UserType,
  async resolve(parent): Promise<User> {
    const [user] = await db.select({
      id: userTable.id,
      username: userTable.username,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,

    }).from(userTable).where(eq(userTable.id, parent.authorId));

    return user;
  },
};
