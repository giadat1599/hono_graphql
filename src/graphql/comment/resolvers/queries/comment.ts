import { eq } from "drizzle-orm";
import { GraphQLInt, GraphQLNonNull } from "graphql";

import type { Comment, Maybe, QueryCommentArgs } from "@/graphql/__generated";
import type { GraphqlResolver } from "@/graphql/graphql-resolver";

import db from "@/db";
import { commentTable } from "@/db/schemas";
import { Comment as CommentType } from "@/graphql/comment/type-defs/comment";

const comment: GraphqlResolver<QueryCommentArgs> = {
  get type() { return CommentType; },
  args: { id: { type: new GraphQLNonNull(GraphQLInt) } },
  async resolve(_parent, args): Promise<Maybe<Omit<Comment, "post">>> {
    const [comment] = await db.select().from(commentTable).where(eq(commentTable.id, args.id));
    return comment;
  },
};

export default comment;
