import ViewIconUnit from "@/components/organisms/common/view/ViewIconUnit";
import { eventContainerClass } from "@/styles/event";
import { EventViewViewModel } from "@/types/event/viewmodel";

interface Props {
  event: EventViewViewModel;
}

  /**
 * イベントの会場のビュー
 * 
 * このコンポーネントは、イベント詳細画面の会場のビューを表示します
 * 
 * スタイルのカスタマイズ:
 * - eventContainerClass: コンテナのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * 
 * 使用例:
 */
export default function VenueView({ event }: Readonly<Props>) {
  return (
    <div className={eventContainerClass}>
      <div className="flex justify-end items-center w-full gap-x-2">
      <ViewIconUnit unit={{
          name: "venueEdit",
          iconName: "Pencil",
          description: "編集",
          href: `/event/venueedit/${event.eventId}`,
          iconClassName: "w-6 h-6",
        }} />
      </div>
      <div className="flex justify-center items-center mx-2 rounded-lg h-full">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt="間取りの情報" width={300} height={300} />
        ) : (
          <div className="flex justify-center items-center w-full h-full rounded-lg">
            <p>間取りの情報がありません</p>
          </div>
        )}
      </div>
    </div>
  )
} 