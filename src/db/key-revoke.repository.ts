import { db } from "./index";
import { config } from "../config/config";

export async function revokeKey(hashedKey: string) {
          const tableName = config.app.db_table;

          const query = `
          UPDATE ${tableName}
          SET revoked = true,
          revoked_at = $1
          WHERE hashed_key = $2 AND revoked = false
          RETURNING revoked_at;
          `;

          const result = await db.query(query, [new Date(), hashedKey]);
          return {
                    "success": (result.rowCount as number) > 0,
                    "revoked_at": result.rows[0]?.revoked_at
          }
          
}