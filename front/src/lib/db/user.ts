import { db } from '@/lib/db';
import { users } from '@/lib/db/schema/user';
import { eq } from 'drizzle-orm';

export async function selectUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] ?? null;
}

export async function insertUser({
  email,
  name,
  bio,
  interests,
}: {
  email: string;
  name: string;
  bio: string;
  interests: string;
}) {
  return await db.insert(users).values({
    email,
    name,
    bio,
    interests,
  });
}

export async function updateUserById(
  userId: number,
  data: { name: string; bio: string; interests: string }
) {
  await db
    .update(users)
    .set({
      name: data.name,
      bio: data.bio,
      interests: data.interests,
    })
    .where(eq(users.id, userId));
}
