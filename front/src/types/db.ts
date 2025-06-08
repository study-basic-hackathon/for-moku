// src/types/db.ts
import { db } from '@/lib/db';


export type Transaction = Parameters<typeof db.transaction>[0] extends (tx: infer T) => any ? T : never;
