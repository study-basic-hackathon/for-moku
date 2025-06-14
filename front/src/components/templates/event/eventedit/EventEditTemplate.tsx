'use client';

import CommonRegisterTemplate from '@/components/templates/common/CommonRegisterTemplate';
import { useState } from 'react';
import type { EventRegisterFormField, EventRegisterForm } from '@/types/event/form';
import { FormState } from '@/types/common/form';
import { EventEditViewModel } from '@/types/event/viewmodel';
import { EVENT_EDIT_FORM_FIELDS } from '@/lib/event/eventedit/constants';
import { updateEventInfo } from '@/actions/event/eventedit/updateEventInfo';

interface EventEditTemplateProps {
  eventViewModel: EventEditViewModel;
}

/**
 * イベント編集テンプレート
 * 
 * @param event イベント情報ビューモデル
 * @returns イベント編集テンプレート
 */
export default function EventEditTemplate({ eventViewModel }: Readonly<EventEditTemplateProps>) {
  const { eventId,
          eventName,
          description, 
          eventDate, 
          eventStartTime, 
          eventEndTime, 
          eventUrl, 
          venueUrl, 
          userGroupName, 
          userGroupId } = eventViewModel;
  
  // オプションの値を代入する
  const [formFields] = useState<EventRegisterFormField[]>(
    EVENT_EDIT_FORM_FIELDS.map((field) => {
      switch (field?.name) {
        case 'userGroupId':
          return {
            ...field,
            defaultValue: userGroupId.toString(),
            options: [{
              value: userGroupId.toString(),
              label: userGroupName  
            }]
          }
        case 'name':
          return {
            ...field,
            defaultValue: eventName
          }
        case 'description':
          return {
            ...field,
            defaultValue: description
          }
        case 'eventDate':
          return {
            ...field,
            defaultValue: eventDate
          }
        case 'eventStartTime':
          return {
            ...field,
            defaultValue: eventStartTime
          }
        case 'eventEndTime':
          return {
            ...field,
            defaultValue: eventEndTime
          }
        case 'eventUrl':
          return {
            ...field,
            defaultValue: eventUrl
          }
        case 'venueUrl':  
          return {
            ...field,
            defaultValue: venueUrl
          }
        default:
          return field
      }
    })
  );

  // サブミット時に送信する関数を定義します
  // ラップしているだけに見えるかもしれませんが、
  // IDなどinput要素として入れておきたくないものを事前に渡せるようにしています。
  const onSubmit = (state: FormState, formData: FormData) => {
    return updateEventInfo(state, formData, eventId);
  }

  return (
    <CommonRegisterTemplate<EventRegisterForm>
      title="イベント編集"
      fields={formFields}
      onSubmit={onSubmit}
    />
  );
}
