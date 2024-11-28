import type { z, ZodSchema } from "zod";

import { flattenMapError } from "./flatten-map-error";

export function validator<T extends ZodSchema>(schema: T, input: unknown): [z.infer<typeof schema>, string[]] {
  const { success, error, data } = schema.safeParse(input);
  if (!success) {
    return [null, flattenMapError(error.flatten().fieldErrors as Record<string, string[]>)];
  }

  return [data, []];
}
