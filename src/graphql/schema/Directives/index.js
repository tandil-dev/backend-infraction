import * as hasRole from './hasRole';

export default {
  types: hasRole.directive,
  resolvers: {
    hasRole: hasRole.HasRoleDirective,
  },
};
