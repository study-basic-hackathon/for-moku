import { EventListTemplate } from "@/components/templates/event/list/EventListTemplate"
import { getEventListViewModel } from "@/actions/event/list/viewmodel"

export default async function EventListPage() {
  // イベント一覧のViewModelをデータベースから取得
  const viewModel = await getEventListViewModel()

  return (
    <EventListTemplate 
      eventListViewModel={viewModel}
    />
  )
}
