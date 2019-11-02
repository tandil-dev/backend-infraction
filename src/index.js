import 'dotenv/config';

// GraphQL Server
import { ApolloServer } from 'apollo-server';

// GraphQL Schema
import apollo from './graphql';

// Config
import config from './config';

// Middleawares
import handleAuthentication from './middlewares/handleAuthentication';

// Load DataBase
import './sequelize/models';

const server = new ApolloServer({
  playground: config.env !== 'production',
  typeDefs: apollo.typeDefs,
  resolvers: apollo.resolvers,
  schemaDirectives: apollo.schemaDirectives,
  formatResponse: apollo.formatResponse,
  debug: apollo.debug,
  uploads: {
    maxFileSize: config.uploadMaxSize * 1024 * 1024, // Max 2 MB
  },
  tracing: true,
  cors: {
    origin: config.corsDomain,
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: config.jwt.tokenName,
  },
  context: async ({ req, res }) => {
    await handleAuthentication(req);
    return {
      res,
      user: req.user,
      isVendor: req.isVendor,
    };
  },
  cacheControl: { defaultMaxAge: 30 }, // 10 seconds
});

server.listen({ port: config.port }).then((result) => {
  console.log(`GraphQL running and listening at ${result.url}`);
  console.log(`Subscriptions running and listening at ${result.subscriptionsUrl}`);
});
