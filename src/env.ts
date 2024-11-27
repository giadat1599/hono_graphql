import type { ZodError } from "zod";

import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  DATABASE_URL: z.string(),
});

type Env = z.infer<typeof EnvSchema>;

// eslint-disable-next-line import/no-mutable-exports
let env: Env;

try {
  // eslint-disable-next-line node/no-process-env
  env = EnvSchema.parse(process.env);
}
catch (err) {
  const error = err as ZodError;
  console.error("Invalid env: ");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
