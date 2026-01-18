import {
    pgTable,
    bigint,
    pgEnum,
    foreignKey,
    timestamp,
  } from "drizzle-orm/pg-core";
  import { users } from "./user";
  import { userGroups } from "./user_group";

  // enum定義（ロール）
  export const userGroupRoleEnum = pgEnum("user_group_role", ["admin", "member"]);

  export const userGroupAssignments = pgTable("user_group_assignments", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),

    userId: bigint("user_id", { mode: "number" })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // 外部キー（ユーザー）

    userGroupId: bigint("user_group_id", { mode: "number" })
      .notNull()
      .references(() => userGroups.id, { onDelete: "cascade" }), // 外部キー（グループ）

    role: userGroupRoleEnum("role").notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  });
