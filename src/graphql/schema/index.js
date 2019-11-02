import fs from 'fs';
import path from 'path';
import { merge, mapValues } from 'lodash';
import { gql, AuthenticationError } from 'apollo-server';
import config from '~/config';
import ErrorUnauthorized from '~/errors/Unauthorized';

// Directives
import Directives from './Directives';

const Query = gql`
  type Query {
    _empty: String
  }
`;

const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

let resolvers = {};

const typeDefs = [Directives.types, Query, Mutation];

fs.readdirSync(__dirname)
  .filter((dir) => (dir.indexOf('.') < 0) && (dir !== 'Directives'))
  .forEach((dir) => {
    const tmp = require(path.join(__dirname, dir)).default; // eslint-disable-line
    resolvers = merge(resolvers, tmp.resolvers);
    typeDefs.push(tmp.types);
  });

const authenticated = (resolver) => (parent, args, context, info) => {
  if (context.user) {
    return resolver(parent, args, context, info);
  }
  throw new AuthenticationError(ErrorUnauthorized.USER_UNAUTHORIZED);
};

const authResolvers = mapValues(resolvers, (resolver, type) => mapValues(resolver, (item) => {
  if (type !== 'Mutation' && type !== 'Query') return item; // skip type resolvers
  if (/^public/.test(item.name)) return item;
  if (config.env === 'test') { // skip auth for tests
    return item;
  }
  return authenticated(item);
}));

export default {
  typeDefs,
  resolvers: authResolvers,
  schemaDirectives: Directives.resolvers,
};
