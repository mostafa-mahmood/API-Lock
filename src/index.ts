import * as crypto from 'crypto';

const prefix = 'key';
const key = crypto.randomBytes(32).toString('base64url');

console.log(`${prefix}_31514125_${key}`);