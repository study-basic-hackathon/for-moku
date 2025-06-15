import { getVenueEditViewmodel } from "@/actions/event/venueedit/viewmodel";
import VenueEditorTemplate from "@/components/templates/event/venueedit/VenueEditorTemplate"
import { notFound } from "next/navigation";

export default async function EventVenueEditPage({
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
  const eventVenueEditViewModel = await getVenueEditViewmodel({eventId: eventIdNumber});
  
  if (!eventVenueEditViewModel) {
    return notFound();
  }

  return (
    <VenueEditorTemplate eventVenueEditViewModel={eventVenueEditViewModel} />
  );
}
