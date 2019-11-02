import 'dotenv/config';
import jwt from 'jsonwebtoken';
import config from '../src/config';

console.log(config.jwt.secret);
// This token never expires
const token = jwt.sign({ user: config.aws.user }, config.jwt.secret);
console.log(token);
