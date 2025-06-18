import { auth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import { EventListItem, EventListViewModel } from "@/types/event/viewmodel"
import { Role } from "@/types/event/role";
import { selectEventsSearchResultByUserEmail } from "@/lib/db/event";
import { EventSearchResult } from "@/types/event/schema";


type MockEvent = {
  id: number;
  name: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  userGroupName: string;
  role: Role;
}

/**
 * イベント一覧用のビューモデルを取得する
 * @returns イベント一覧用のビューモデル
 */
export const getEventListViewModel = async (): Promise<EventListViewModel> => {
  const session = await auth();
  if (!session?.user) {
    redirect('/user/register');
  }
  if (!session.user.email) {
    notFound();
  }

  // データベースからイベント一覧を取得
  const events: EventSearchResult[] = await selectEventsSearchResultByUserEmail(session.user.email);

  // イベントの一覧をビューモデルに変換
  const eventListItems: EventListItem[] = events.map((event) => ({
    id: event.id.toString(),
    name: event.name,
    description: event.description ?? "",
    startDateTime: event.startDateTime.toISOString(),
    endDateTime: event.endDateTime.toISOString(),
    userGroupName: event.userGroupName,
    role: event.role,
  }));

  return {
    events: eventListItems,
  };
}; 