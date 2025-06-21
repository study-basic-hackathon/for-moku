import { ServerPagenationTemplate } from "@/components/templates/sample/list/serverPagenation/ServerPagenationTemplate";
import { getEventListViewModelServerPagenationSample } from "@/actions/sample/list/serverPagenation";

export default async function Events({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const {events, totalCount, currentPage, totalPages, pageSize} = await getEventListViewModelServerPagenationSample({
    search: params.search as string,
    page: Number(params.page) || 1,
    pageSize: Number(params.pageSize) || 10,
    sortColumn: params.sortColumn as string,
    sortDirection: params.sortDirection as "asc" | "desc"
  })

  return (
    <ServerPagenationTemplate 
      events={events}
      pageInfo={{
        totalCount,
        currentPage,
        totalPages,
        pageSize
      }}
    />
  );
}
