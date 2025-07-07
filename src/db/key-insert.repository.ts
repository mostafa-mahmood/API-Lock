import {db} from './index';
import {config} from '../config/config';
import {ApiKey} from '../types/api-key';
import {sha256Hash} from '../utils/common-utils';

export async function insertKey(keyObj: ApiKey) {

          const keysTable = config.app.db_table;
          const hashed_key = sha256Hash(keyObj.key);

          const query = `
                    INSERT INTO ${keysTable} (key_id, user_id, hashed_key,
                    scopes, created_at, expires_at, last_used, revoked_at,
                    revoked, is_one_time)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    `;
          
          const values = [
                    keyObj.key_id,
                    keyObj.user_id,
                    hashed_key,
                    keyObj.scopes,
                    keyObj.created_at,
                    keyObj.expires_at,
                    keyObj.last_used,
                    keyObj.revoked_at,
                    keyObj.revoked,
                    keyObj.is_one_time
          ];

          await db.query(query, values);
}