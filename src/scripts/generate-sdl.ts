import { printSchema } from "graphql";
import fs from "node:fs";
import path from "node:path";

import schema from "@/graphql/type-defs";

const gqlSDLPath = path.resolve(__dirname, "../graphql/schema.graphql");

const sdl = printSchema(schema);

fs.writeFileSync(gqlSDLPath, sdl, "utf-8");

// eslint-disable-next-line no-console
console.log("graphql schema saved to: ", gqlSDLPath);
