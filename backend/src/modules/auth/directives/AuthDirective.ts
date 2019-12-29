import { AuthenticationError } from "apollo-server-errors";
import { defaultFieldResolver } from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    // const { roles } = this.args;
    field.resolve = async function(...args) {
      const [, {}, { user, token }] = args;
      if (!user || !user.email || !token) {
        throw new AuthenticationError("Unauthorized");
      }
      return await resolve.apply(this, args);
    };
  }
}

export default {
  auth: AuthDirective,
};
