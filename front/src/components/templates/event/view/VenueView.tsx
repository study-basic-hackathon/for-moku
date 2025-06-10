import ViewIconUnit from "@/components/organisms/common/view/ViewIconUnit";
import { eventContainerClass } from "@/styles/event";

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
export default function VenueView() {
  return (
    <div className={eventContainerClass}>
      <div className="flex justify-end items-center w-full gap-x-2">
      <ViewIconUnit unit={{
          name: "venueEdit",
          iconName: "Pencil",
          description: "編集",
          href: "/event/venueedit/sample",
          iconClassName: "w-6 h-6",
        }} />
      </div>
      <div className="flex justify-center items-center mx-2 rounded-lg">
        <img src="https://images.ygoprodeck.com/images/cards_cropped/99543666.jpg" alt="間取りの情報" width={300} height={300} />
      </div>
    </div>
  )
} 