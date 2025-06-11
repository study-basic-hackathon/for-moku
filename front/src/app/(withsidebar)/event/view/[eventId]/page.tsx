import EventViewTemplate from "@/components/templates/event/view/EventViewTemplate"
import { notFound } from "next/navigation";
import { getEventViewViewModel } from "@/actions/event/eventview";

export default async function EventViewPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  
  // 数字にパース
  const eventIdNumber = Number(eventId);
  
  // idが数字でない場合はエラーを返す
  if (Number.isNaN(eventIdNumber)) {
    return notFound();
  }

  // イベント詳細画面用のビューモデルを取得
  const eventViewModel = await getEventViewViewModel(eventIdNumber);
  
  if (!eventViewModel) {
    return notFound();
  }

  // イベント詳細画面を表示
  return <EventViewTemplate event={eventViewModel} />
} 