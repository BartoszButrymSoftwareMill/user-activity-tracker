import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import 'dotenv/config';
import * as schema from './schema/index.js';

const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle({ client: queryClient, schema });

export default db;