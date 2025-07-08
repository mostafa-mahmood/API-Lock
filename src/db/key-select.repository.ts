import { db } from './index';
import {config} from '../config/config';

export async function selectKey(hashedKey: string) {
          
          const tableName = config.app.db_table;
          
          const query = `
          SELECT * FROM ${tableName} 
          WHERE hashed_key = $1`;
          const values = [hashedKey];
          const result = await db.query(query, values);

          return result;
}