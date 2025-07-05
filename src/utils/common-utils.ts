import * as crypto from 'node:crypto';
import {v4 as uuid4} from 'uuid';

export function sha256Hash(key:string): string {
          const hash = crypto.createHash('sha256').update(key).digest('hex');
          return hash;
}

export function generateUniqueId(): string {
          return uuid4();
}

export function returnCurrentTimestamp(): Date {
          return new Date();
}