import EventViewTemplate from "@/components/templates/event/view/EventViewTemplate"
import { selectEventById } from "@/lib/db/event";
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

  const event = await selectEventById(eventIdNumber);
  
  // イベントが見つからない場合はエラーを返す
  if (!event) {
    return notFound();
  }

  console.log(event);
  
  return <EventViewTemplate/>
} 