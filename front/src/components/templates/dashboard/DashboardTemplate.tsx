'use client'
import { DashboardViewModel } from '@/types/dashboard/viewmodel';
import { EventInput } from '@fullcalendar/core';
import FormokuCalendar from '@/components/organisms/dashboard/FormokuCalendar';

// 以下のページを参考に作っています
// https://webstudioleaf.com/blog/js/fullcal-custom/
// https://zenn.dev/sushizanmai/articles/6f25590061de2c#%E6%97%A5%E5%B8%B8%E3%81%AE%E7%96%91%E5%95%8F%E3%81%8B%E3%82%89
// https://qiita.com/dende-h/items/e6c65198e3d7debf0f1e


/**
 * 日本語形式の日付文字列をDate型にパース
 * 
 * @param dateStr 日本語形式の日付文字列（YYYY年MM月dd日 HH:mm）
 * @returns パースされたDate型
 */
export function parseDateTimeYYYYMMDDHHMMJPN(dateStr: string): Date {
  const match = dateStr.match(/(\d+)年(\d+)月(\d+)日 (\d+):(\d+)/);
  if (!match) {
    return new Date();
  }
  const [_, year, month, day, hours, minutes] = match;
  return new Date(
    parseInt(year),
    parseInt(month) - 1, // 1月は0、2月は1、...
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );
}

type Props = {
  dashboardViewModel: DashboardViewModel;
}

export default function DashboardTemplate({ dashboardViewModel }: Props) {
  const { eventCalenderUnits } = dashboardViewModel;

  // デバッグ用
  console.log(eventCalenderUnits);

  // eventCalenderUnitsから適切な形式に変換する必要がある
  const events: EventInput[] = eventCalenderUnits.map((unit) => ({
    title: unit.title,
    start: parseDateTimeYYYYMMDDHHMMJPN(unit.startDateTime),
    end: parseDateTimeYYYYMMDDHHMMJPN(unit.endDateTime),
    backgroundColor: unit.backgroundColor,
    borderColor: unit.borderColor,
    url: unit.unitUrl,
  }));

  return (
    <div className="p-4 h-full grid grid-cols-1 xl:grid-cols-1 gap-2">
      <FormokuCalendar events={events} />
    </div>
  );
}