export interface ApiKey {
          key_id: string;
          user_id: string;
          key: string;
          scopes: string[];
          created_at: Date;
          expires_at?: Date;
          last_used?: Date;
          revoked_at?: Date;
          revoked: boolean;
          is_one_time: boolean;
}