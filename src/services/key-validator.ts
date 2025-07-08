import { sha256Hash } from '../utils/common-utils';
import { selectKey } from '../db/key-select.repository';
import { QueryResult } from 'pg';
import { KeyObject, UUID } from 'crypto';
import { keyRevoker } from './key-revoker';


interface ValidValidationObj {
  keyId: UUID;
  userId: string;
  scopes: string[];
  valid: true;
}

interface InvalidValidationObj {
  valid: false;
  error: string;
  revokedAt?: Date;
  expiredAt?: Date;
}

type ValidationObj = ValidValidationObj | InvalidValidationObj;

export async function validateKey(rawKey: string): Promise<ValidationObj> {
          const hashedKey: string = sha256Hash(rawKey);
          const queryResult: QueryResult<any> = await selectKey(hashedKey);
          const row = queryResult.rows[0];


          if(queryResult.rowCount === 0) {
                    return {
                              valid: false,
                              error: "Key is invalid"
                    }
          }

          if(row.revoked) {
                    return {
                              valid: false,
                              error: "Key is revoked",
                              revokedAt: row.revoked_at
                    }
          }

          if(row.expires_at && row.expires_at < new Date()) {
                    return {
                              valid: false,
                              error: "Key expired",
                              expiredAt: row.expires_at
                    }
          }

          if(row.is_one_time) {
                    await keyRevoker(hashedKey);
          }

          return {
                    keyId: row.key_id,
                    userId: row.user_id,
                    scopes: row.scopes,
                    valid: true,
          }
}

