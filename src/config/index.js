const commonConfig = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 8081,
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    duration: process.env.JWT_DURATION || '24 hours',
    tokenName: process.env.JWT_TOKEN_NAME || 'x-backend-infraction',
  },
  corsDomain: process.env.CORS_DOMAIN || '*',
  uploadMaxSize: process.env.UPLOAD_MAX_SIZE || 2, // 2 MB
};

const getDB = () => {
  const url = process.env.DB_URL;
  return {
    url,
  };
};

module.exports = {
  ...commonConfig,
  database: getDB(),
};
