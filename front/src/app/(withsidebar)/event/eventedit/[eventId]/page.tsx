import EventEditTemplate from "@/components/templates/event/eventedit/EventEditTemplate";
import { getEventEditViewModel } from "@/actions/event/eventedit/viewmodel";
import { notFound } from "next/navigation";

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
  const eventViewModel = await getEventEditViewModel(eventIdNumber);
  
  if (!eventViewModel) {
    return notFound();
  }

  // イベント編集画面を表示
  return <EventEditTemplate eventViewModel={eventViewModel} />;
} 