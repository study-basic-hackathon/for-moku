import { userGroups } from '@/lib/db/schema/user_group';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type UserGroup = InferSelectModel<typeof userGroups>;
export type NewUserGroup = InferInsertModel<typeof userGroups>;
