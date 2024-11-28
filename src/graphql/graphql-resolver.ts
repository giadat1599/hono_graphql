import type { GraphQLFieldConfig } from "graphql";

import type { AppContext } from "@/app-context";

export type GraphqlResolver<TArgs = any, TSource = any > = GraphQLFieldConfig<TSource, AppContext, TArgs>;
