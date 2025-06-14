'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'

// 以下のページを参考に作っています
// https://webstudioleaf.com/blog/js/fullcal-custom/
// https://zenn.dev/sushizanmai/articles/6f25590061de2c#%E6%97%A5%E5%B8%B8%E3%81%AE%E7%96%91%E5%95%8F%E3%81%8B%E3%82%89
// https://qiita.com/dende-h/items/e6c65198e3d7debf0f1e


//日本語対応のためのインポート
import jaLocale from "@fullcalendar/core/locales/ja";

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const eventExample = [
  {
    title: "イベント１",
    start: new Date(),
    end: new Date().setDate(new Date().getDate()),
    description: "イベント１",
    backgroundColor: "#000000",
    borderColor: "#000000",
    url: "/event/view/1",
  },
  {
    title: "イベント２",
    start: new Date().setDate(new Date().getDate() + 5),
    description: "イベント２",
    backgroundColor: "blue",
    borderColor: "blue"
  }
];

export default function DashboardSampleTemplate() {
  return (
    <div className="p-4 h-full grid grid-cols-1 xl:grid-cols-1 gap-2">
    <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin]}
    initialView="dayGridMonth"
    events={eventExample}
    aspectRatio={1}
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek"
      }}
    dayCellContent={(e) => {
        e.dayNumberText = e.dayNumberText.replace('日', '');
        return <div className="text-sm">{e.dayNumberText}</div>;
    }}
    dayHeaderContent={(arg) => {
      return DAY_NAMES[arg.date.getDay()]
    }}
    contentHeight={"auto"}
    allDaySlot={false}
    locale={jaLocale}
    />
    </div>
  );
}