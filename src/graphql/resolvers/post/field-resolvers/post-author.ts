import { eq } from "drizzle-orm";

import type { Post } from "@/graphql/generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { User } from "@/graphql/type-defs/user/user";

export const postAuthor: GraphqlResolver<any, Post> = {
  type: User,
  async resolve(parent): Promise<Post["author"]> {
    const [user] = await db.select({
      id: userTable.id,
      username: userTable.username,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,

    }).from(userTable).where(eq(userTable.id, parent.authorId!));

    return user;
  },
};
