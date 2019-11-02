import jwt from 'jsonwebtoken';
import config from '~/config';

export default async (req) => {
  req.user = undefined;
  req.isVendor = undefined;

  const token = req.headers[config.jwt.tokenName];

  if (token) {
    try {
      const { user } = await jwt.verify(token, config.jwt.secret);
      req.user = user;
    } catch (err) {
      // TODO: Refresh Token
    }
  }
};
