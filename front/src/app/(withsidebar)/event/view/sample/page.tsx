import EventViewTemplate from "@/components/templates/event/view/EventViewTemplate"
import { getEventViewViewModel } from "@/actions/event/eventview/viewmodel";
import { notFound } from "next/navigation";

export default async function EventViewPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  // サンプルページなので１で固定
  const eventId = 1

  // イベント詳細画面用のビューモデルを取得
  const eventViewModel = await getEventViewViewModel(eventId);

  // イベント詳細画面用のビューモデルが取得できない場合はエラーを返す
  if (!eventViewModel) {
    return notFound();
  }

  // イベント詳細画面を表示
  return <EventViewTemplate event={eventViewModel} />
} 