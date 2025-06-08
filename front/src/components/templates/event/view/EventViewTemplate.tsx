import EventView from "@/components/templates/event/view/EventView"
import VenueView from "@/components/templates/event/view/VenueView"
import EventViewHeader from "@/components/templates/event/view/EventViewHeader"
import TwoColumnTemplate from "@/components/templates/common/TwoColumnTemplate" 

export default function EventViewTemplate() {
  return (
    <TwoColumnTemplate
      header={<EventViewHeader />}
      leftContent={<VenueView />}
      rightContent={<EventView />}
    />
  )
} 