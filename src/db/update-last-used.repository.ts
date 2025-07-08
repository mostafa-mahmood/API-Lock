import { db } from "./index";
import { UUID } from 'crypto';

export async function updateLastUsed(keyId: UUID): Promise<void> {
          const currentDate = new Date();
          
          const query = `
          UPDATE api_keys 
          SET last_used = $1
          WHERE key_id = $2`;

          const values = [currentDate, keyId];

          const result = await db.query(query, values);

          if(result.rowCount === 0) {
                    console.warn(`[updateLastUsed]: No key found with ID: ${keyId}`)
          }
}