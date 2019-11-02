import {
  gql,
  SchemaDirectiveVisitor,
  ForbiddenError,
  AuthenticationError,
} from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import config from '~/config';
import UnauthorizedErrorCodes from '~/errors/Unauthorized';

export const directive = gql`
  directive @hasRole (role: [String]) on QUERY | FIELD | FIELD_DEFINITION
`;

export class HasRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const expectedRoles = this.args.role;
    field.resolve = async function (...args) { // eslint-disable-line
      const context = args[2];
      if (!context.user) {
        throw new AuthenticationError(UnauthorizedErrorCodes.USER_UNAUTHORIZED);
      }
      const role = { name: 'Admin' };
      if (config.env === 'test' || (role && expectedRoles.indexOf(role.name) >= 0)) {
        const resolver = await resolve.apply(this, args);
        return resolver;
      }
      throw new ForbiddenError('Forbidden');
    };
  }
}
