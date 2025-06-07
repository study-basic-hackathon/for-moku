import { db } from '@/lib/db';
import { userGroups } from '@/lib/db/schema/user_group';
import { eq } from 'drizzle-orm';

type NewUserGroup = {
  name: string;
  description: string;
};

export async function insertUserGroup(data: NewUserGroup) {
  await db.insert(userGroups).values({
    name: data.name,
    description: data.description,
  });
}
