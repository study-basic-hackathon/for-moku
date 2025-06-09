// src/types/db.ts
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

export type Transaction = PgTransaction<NodePgQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;
