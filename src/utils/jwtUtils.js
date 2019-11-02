import jwt from 'jsonwebtoken';

import config from '~/config';

async function genToken(user) {
  const userPayload = user.dataValues;
  delete userPayload.password;

  const jwtPayload = { user: userPayload };

  const jwtSecret = config.jwt.secret;
  const jwtData = { expiresIn: config.jwt.duration };

  return jwt.sign(jwtPayload, jwtSecret, jwtData);
}

async function responseToken(user) {
  let token = null;
  token = await genToken(user);

  return {
    token,
  };
}

function generateToken(payload, secret, expiresIn) {
  return jwt.sign(payload, secret, { expiresIn });
}

async function readToken(token, secret, options) {
  let data;
  try {
    data = await jwt.verify(token, secret, options);
  } catch (err) {
    data = null;
  }
  return data;
}

export default {
  responseToken,
  generateToken,
  readToken,
};
