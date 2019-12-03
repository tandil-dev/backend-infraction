import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '~/config';

const basename = path.basename(__filename);

let logging = console.log;
if (config.env !== 'development') {
  logging = false;
}

const dbConfig = config.database.url ? [config.database.url, { logging }]
  : [
    config.database.database,
    config.database.username,
    config.database.password,
    {
      dialect: config.database.dialect,
      host: config.database.host,
      port: config.database.port,
      logging,
    },
  ];

console.log('DB - Config', dbConfig[0]);
const sequelize = new Sequelize(...dbConfig);

// Test Sequelize connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL DB has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const models = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .map((file) => {
    const model = require(path.join(__dirname, file)).default; // eslint-disable-line
    return { [model.name]: model.init(sequelize) };
  }));

// Load model associations
Object.keys(models).forEach((model) => {
  if (typeof models[model].associate === 'function') {
    models[model].associate(models);
  }
});

models.sequelize = sequelize; // delegate initialization to bootstrapping

module.exports = models;
