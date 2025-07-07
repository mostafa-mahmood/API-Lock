import { sha256Hash } from '../utils/common-utils';
import { selectKey } from '../db/key-select.repository';
import { QueryResult } from 'pg';
import { UUID } from 'crypto';


interface validationObj {
          keyId?: UUID,
          userId?: string,
          scopes?: string[],
          valid: boolean,
          error?: string,
          revokedAt?: Date,
          expiredAt?: Date,
}
export async function validateKey(rawKey: string): Promise<validationObj> {
          const hashedKey: string = sha256Hash(rawKey);
          const queryResult: QueryResult<any> = await selectKey(hashedKey);
          const row = queryResult.rows[0];


          if(queryResult.rowCount === 0) {
                    return {
                              valid: false,
                              error: "Key is invalid"
                    }
          }

          if(row.revoked === true) {
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

          return {
                    keyId: row.key_id,
                    userId: row.user_id,
                    scopes: row.scopes,
                    valid: true,
          }
}

