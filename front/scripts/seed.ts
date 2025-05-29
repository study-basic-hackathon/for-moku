// scripts/seed.ts
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

async function seed() {
  // すでに同じメールアドレスのユーザーが存在するかチェック
  const existing = await db.select().from(users).where(eq(users.email, "iguchi.yasunari.0219@gmail.com"));

  if (existing.length > 0) {
    console.log("Sample user already exists.");
    return;
  }

  await db.insert(users).values({
    id: randomUUID(),
    email: "iguchi.yasunari.0219@gmail.com",
    name: "いぐっちゃん",
    bio: "よろしくだお。",
    interests: "Next.js,TypeScript",
  });

  console.log("Sample user created!");
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  });
