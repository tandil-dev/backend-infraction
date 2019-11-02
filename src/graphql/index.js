import config from '~/config';
import schema from './schema';

const formatResponse = (graphQLResult, { context }) => {
  const { res } = context;
  const tokenOperations = [
    'publicLogin',
  ];
  const operationName = Object.keys(graphQLResult.data)[0];
  let extendedResponse = graphQLResult;

  if (operationName && extendedResponse.data && tokenOperations.indexOf(operationName) >= 0) {
    const data = extendedResponse.data[operationName];
    if (data) {
      const { token } = data;
      res.set(config.jwt.tokenName, token);
      extendedResponse = {
        data: { [operationName]: data },
      };
    }
  }
  return extendedResponse;
};

export default {
  formatResponse,
  typeDefs: schema.typeDefs,
  resolvers: schema.resolvers,
  schemaDirectives: schema.schemaDirectives,
  debug: config.env !== 'production',
};
