import EventView from "@/components/templates/event/view/EventView"
import VenueView from "@/components/templates/event/view/VenueView"
import EventViewHeader from "@/components/templates/event/view/EventViewHeader"
import TwoColumnTemplate from "@/components/templates/common/TwoColumnTemplate" 
import { EventViewViewModel } from "@/types/event/viewmodel";

interface Props {
  event: EventViewViewModel;
}

export default function EventViewTemplate({ event }: Readonly<Props>) {

  // イベント詳細画面は、ヘッダー、左コンテンツ、右コンテンツの3つのコンポーネントで構成されるのでTwoColumnTemplateを使っています
  return (
    <TwoColumnTemplate
      header={<EventViewHeader event={event} />}
      leftContent={<VenueView event={event} />}
      rightContent={<EventView event={event} />}
    />
  )
} 