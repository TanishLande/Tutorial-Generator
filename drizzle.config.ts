import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load .env.local file
dotenv.config({ path: '.env.local' });

const dbUrl = process.env.NEXT_PUBLIC_DB_CONNECTION_STRING;
if (!dbUrl) {
  throw new Error("Database connection string is not defined");
}

export default defineConfig({
  schema: "./configs/schema.tsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
});
