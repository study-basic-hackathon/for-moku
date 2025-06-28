import { MAX_NUM_PIXEL } from "@/lib/event/venueedit/constants";

export default function VenueImage({
	imgUrl
} : {
	imgUrl: string
}) {
	return (
    <div style={{minWidth: MAX_NUM_PIXEL * 50}}>
      <img src={imgUrl} draggable="false"/>
    </div>
  )
}
