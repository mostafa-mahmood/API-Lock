import { db } from "./index";
import { UUID } from 'crypto';
import { config } from "../config/config";

export async function updateLastUsed(keyId: UUID): Promise<void> {
          const tableName = config.app.db_table;
          const currentDate = new Date();
          
          const query = `
          UPDATE ${tableName} 
          SET last_used = $1
          WHERE key_id = $2`;

          const values = [currentDate, keyId];

          const result = await db.query(query, values);

          if(result.rowCount === 0) {
                    console.warn(`[updateLastUsed]: No key found with ID: ${keyId}`)
          }
}