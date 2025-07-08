import { revokeKey } from "../db/key-revoke.repository";


export async function keyRevoker(hashedKey: string): Promise<void> {
          const success = await revokeKey(hashedKey);
          if (!success) {
                    console.warn(`[One-time key revoke] Key was already revoked: ${hashedKey}`);
          }
}