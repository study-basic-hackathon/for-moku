import { formatDateTimeYYYYMMDDHHMMJPN } from "@/lib/util/date";
import { DashboardViewModel } from "@/types/dashboard/viewmodel";

const eventExample = [
  {
    title: "イベント１",
    startDateTime: formatDateTimeYYYYMMDDHHMMJPN(new Date()),
    endDateTime: formatDateTimeYYYYMMDDHHMMJPN(new Date(Date.now() + 0.5 * 24 * 60 * 60 * 1000)),
    description: "イベント１",
    backgroundColor: "#000000",
    borderColor: "#000000",
    unitUrl: "/event/view/1",
  },
  {
    title: "イベント２",
    startDateTime: formatDateTimeYYYYMMDDHHMMJPN(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)),
    endDateTime: formatDateTimeYYYYMMDDHHMMJPN(new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)),
    description: "イベント２",
    backgroundColor: "blue",
    borderColor: "blue",
    unitUrl: "/event/view/2",
  }
];

export const getDashboardViewModel = async (): Promise<DashboardViewModel> => {

  // TODO 権限の確認はきちんとやること

  // かなりテキトーな値を返しているので注意すること

  return { eventCalenderUnits: eventExample };
};