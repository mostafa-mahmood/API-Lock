import * as crypto from 'crypto';
import {ApiKey} from '../types/api-key';
import {generateUniqueId, returnCurrentTimestamp} from '../utils/common-utils';

export function generateKeyObject(userId:string, scopes:string[], 
                                 isOneTime: boolean,
                                 expiresAt?: Date): ApiKey {
          
          const rawKey: string = generateRawKey(userId);
          const currentTimestamp: Date = returnCurrentTimestamp();
          const keyId: string = generateUniqueId();

          const keyObj: ApiKey = {
                    key_id: keyId,
                    user_id: userId,
                    key: rawKey,
                    scopes: scopes,
                    created_at: currentTimestamp,
                    expires_at: expiresAt,
                    revoked: false,
                    is_one_time: isOneTime
          }
          return keyObj;
}

function generateRawKey(userId:string): string {
          const prefix = 'key';
          const key = crypto.randomBytes(32).toString('base64url');
          return `${prefix}_${userId}_${key}`;
}





