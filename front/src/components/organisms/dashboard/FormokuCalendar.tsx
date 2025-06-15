'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { EventInput } from '@fullcalendar/core';
import jaLocale from "@fullcalendar/core/locales/ja";

const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

type Props = {
  events: EventInput[];
}

export default function FormokuCalendar({ events }: Props) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="dayGridMonth"
      events={events}
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
  );
} 