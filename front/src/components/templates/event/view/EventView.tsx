import EventLocation from "@/components/organisms/event/view/LocationIconUnit";
import EventStartTime from "@/components/organisms/event/view/StartTimeIconUnit";
import EventEndTime from "@/components/organisms/event/view/EndTimeIconUnit";
import EventDescription from "@/components/organisms/event/view/DescriptionIconUnit";
import UserGroupIconUnit from "@/components/organisms/event/view/UserGroupIconUnit";
import ToEventEdit from "@/components/organisms/event/view/ToEventEdit";
import { eventContainerClass } from "@/styles/event";

export default function EventView() {
  return (
    <div className={eventContainerClass}>
      <div className="flex justify-end items-center w-full">
        <ToEventEdit />
      </div>
      <EventLocation />
      <UserGroupIconUnit />
      <EventStartTime />
      <EventEndTime />
      <EventDescription />
    </div>
  )
} 