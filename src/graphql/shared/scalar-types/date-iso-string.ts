import { GraphQLScalarType, Kind } from "graphql";

export const DateISOStringScalar = new GraphQLScalarType({
  name: "DateISOString",
  description: "A custom Date scalar type",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return typeof value === "string" ? new Date(value) : null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
