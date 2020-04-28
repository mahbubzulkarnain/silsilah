import { AuthenticationError } from 'apollo-server-errors';
import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

class AuthDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  public visitFieldDefinition(field): void {
    const { resolve = defaultFieldResolver } = field;
    // const { roles } = this.args;
    // eslint-disable-next-line no-param-reassign,func-names
    field.resolve = async function (...args): Promise<any> {
      // eslint-disable-next-line no-empty-pattern
      const [, {}, { user, token }] = args;
      if (!user || !user.email || !token) {
        throw new AuthenticationError('Unauthorized');
      }
      return resolve.apply(this, args);
    };
  }
}

export default {
  auth : AuthDirective,
};
