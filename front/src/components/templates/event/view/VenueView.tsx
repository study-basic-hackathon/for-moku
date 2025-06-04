import ToVenueEdit from "@/components/organisms/event/view/ToVenueEdit";
import { eventContainerClass } from "@/styles/event";

export default function EventView() {
  return (
    <div className={eventContainerClass}>
      <div className="flex justify-end items-center w-full">
        <ToVenueEdit />
      </div>
      <div className="flex justify-center items-center mx-2 rounded-lg">
        <img src="https://images.ygoprodeck.com/images/cards_cropped/99543666.jpg" alt="間取りの情報" width={300} height={300} />
      </div>
    </div>
  )
} 