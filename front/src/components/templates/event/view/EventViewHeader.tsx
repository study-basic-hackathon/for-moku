import EventName from "@/components/organisms/event/view/NameIconUnit";
import EventShareLink from "@/components/organisms/event/view/ShareLinkUnit";
import { eventContainerClass } from "@/styles/event";

export default function EventViewHeader() {
  return (
    <div className={eventContainerClass}>
      <EventName />
      <EventShareLink />
    </div>
  )
} 