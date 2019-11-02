import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import GraphQLUUID from 'graphql-type-uuid';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      let result = value;
      if (typeof value === 'string') {
        result = new Date(value);
      }
      return result.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
  UUID: GraphQLUUID,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
