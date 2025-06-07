import { db } from '@/lib/db';
import { userGroups } from '@/lib/db/schema/user_group';
import { eq } from 'drizzle-orm';


export async function selectUserGroupByName(name: string) {
  const result = await db
    .select()
    .from(userGroups)
    .where(eq(userGroups.name, name))
    .limit(1);

  return result[0] ?? null;
}


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
