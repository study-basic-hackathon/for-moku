// src/types/db.ts
import { PgTransaction } from 'drizzle-orm/pg-core';
import { NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

/**
 * トランザクションの型定義
 *
 * PgTransaction: PostgreSQL用のトランザクション型
 * NodePgQueryResultHKT: Node.js用のPostgreSQLクエリ結果の型
 * schema: データベーススキーマをインポート
 * ExtractTablesWithRelations: スキーマからテーブルとそのリレーションを抽出
 */
export type Transaction = PgTransaction<NodePgQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;