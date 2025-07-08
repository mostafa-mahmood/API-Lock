import { db } from "./index";
import { config } from "../config/config";

export async function revokeKey(hashedKey: string) {
          const tableName = config.app.db_table;

          const query = `
          UPDATE ${tableName}
          SET revoked = $1,
          revoked_at = $2
          WHERE hashed_key = $3`

          const values = [true, new Date(), hashedKey];

          const result = await db.query(query, values);

          return (result.rowCount as number) > 0;
}