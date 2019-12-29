import { defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

class UpperCaseDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

export default {
  upper: UpperCaseDirective,
};
