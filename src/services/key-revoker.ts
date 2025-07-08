import { revokeKey } from "../db/key-revoke.repository";

interface revokeObj {
          message: string,
          revoked_at?: Date
}

export async function keyRevoker(hashedKey: string): Promise<revokeObj> {
          const result = await revokeKey(hashedKey);
          if (!result.success) {
                    return {
                              "message": `Key was already revoked: ${hashedKey}`,
                    }
          } else {
                    return {
                              "message": "Key successfully revoked",
                              "revoked_at": result.revoked_at
                    }
          }
}