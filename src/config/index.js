const commonConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 8081,
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    duration: process.env.JWT_DURATION || '24 hours',
    tokenName: process.env.JWT_TOKEN_NAME || 'x-backend-infraction',
  },
  baseUrl: process.env.BASE_URL || 'http://localhost:8081',
  corsDomain: process.env.CORS_DOMAIN || '*',
  uploadMaxSize: process.env.UPLOAD_MAX_SIZE || 2, // 2 MB
  publicUrl: process.env.PUBLIC_URL || 'http://localhost:3000',
  aws: {
    user: process.env.AWS_USER || 'aws_user',
    useLocal: process.env.LOCAL_S3 === 'true',
  },
};

const getDB = () => {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT, 10) || 5432;
  const username = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASS || 'postgres';
  const database = process.env.DB_NAME || 'infraction';
  const dialect = process.env.DB_DIALECT || 'postgres';
  const urlProtocol = (dialect === 'postgres') ? 'postgresql' : dialect;
  return {
    host,
    port,
    username,
    password,
    database,
    dialect,
    url: `${urlProtocol}://${username}:${password}@${host}:${port}/${database}`,
  };
};

module.exports = {
  ...commonConfig,
  database: getDB(),
};
