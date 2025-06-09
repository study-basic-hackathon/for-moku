'use server';

import { auth } from "@/lib/auth/auth";
import { selectAuthedUserGroupsByEmail } from "@/lib/db/user_group";

/**
 * ログイン中のユーザーが所属するユーザーグループを取得
 * 
 * ログイン中のユーザーが所属するユーザーグループのリストを取得
 * 見つからなければ、[]を返却
 * あと、セッションが取得できなければエラーを返却
 * 
 * @returns ログイン中のユーザーが所属するユーザーグループの配列
 */
export async function getMyAuthedUserGroups() {
  const session = await auth();

  if (!session?.user?.email) {
    return Error("ログイン中のユーザーが見つかりません");
  }

  const userGroups = await selectAuthedUserGroupsByEmail(session.user.email);

  return {userGroups};
}