import { userGroups } from '@/lib/db/schema/user_group';
import { InferInsertModel } from 'drizzle-orm';

export type NewUserGroup = InferInsertModel<typeof userGroups>;