import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
          db: {
                    user: process.env.DB_USER!,
                    host: process.env.DB_HOST!,
                    database: process.env.DB_NAME!,
                    password: process.env.DB_PASSWORD!,
                    port: parseInt(process.env.DB_PORT!)
          },
          app: {
                    port: process.env.PORT!,
                    db_table: process.env.API_KEYS_TABLE!
          }
}