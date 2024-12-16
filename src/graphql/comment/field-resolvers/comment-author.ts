import { eq } from "drizzle-orm";

import type { Comment, Maybe, User } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { userTable } from "@/db/schemas";
import { User as UserType } from "@/graphql/user/type-defs/user";

export const commentAuthor: GraphqlResolver<any, Comment> = {
  type: UserType,
  async resolve(parent): Promise<Maybe<User>> {
    if (!parent.authorId) {
      return null;
    }
    const [user] = await db.select({
      id: userTable.id,
      username: userTable.username,
      createdAt: userTable.createdAt,
      updatedAt: userTable.updatedAt,

    }).from(userTable).where(eq(userTable.id, parent.authorId));

    return user;
  },
};
