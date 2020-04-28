/* eslint-disable no-param-reassign */
import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

class UpperCaseDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  public visitFieldDefinition(field): void {
    const { resolve = defaultFieldResolver } = field;
    // eslint-disable-next-line func-names
    field.resolve = async function (...args): Promise<any> {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

export default {
  upper : UpperCaseDirective,
};
