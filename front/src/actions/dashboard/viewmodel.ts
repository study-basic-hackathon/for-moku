import { auth } from "@/lib/auth/auth";
import { selectEventsByUserEmail } from "@/lib/db/event";
import { formatDateTimeYYYYMMDDHHMMJPN } from "@/lib/util/date";
import { DashboardViewModel } from "@/types/dashboard/viewmodel";
import { notFound, redirect } from "next/navigation";
import { getDarkerColorBySeedString } from "@/lib/util/color";

/**
 * ダッシュボード用のビューモデルを取得する
 * @returns ダッシュボード用のビューモデル(というかログイン者に紐づくイベント一覧)
 */
export const getDashboardViewModel = async (): Promise<DashboardViewModel> => {
  // TODO 適切に遷移させる
  const session = await auth();
  if (!session || !session.user) {
    redirect('/user/register');
  }
  if (!session.user.email) {
    notFound(); // TODO 500エラー系に変換する
  }
  // データベースから　イベントの一覧を取得(ログインユーザのメールアドレスに紐づくイベントに限定)
  const events = await selectEventsByUserEmail(session.user.email);
  
  // イベントの一覧をダッシュボード用のビューモデルに変換
  const eventCalendarUnits = events.map((event) => ({
    title: event.name,
    startDateTime: formatDateTimeYYYYMMDDHHMMJPN(event.startDateTime),
    endDateTime: formatDateTimeYYYYMMDDHHMMJPN(event.endDateTime),
    description: event.description ?? "",
    backgroundColor: getDarkerColorBySeedString(event.name),
    borderColor: getDarkerColorBySeedString(event.name),
    unitUrl: `/event/view/${event.id}`,
  }));

  return { eventCalendarUnits };
};