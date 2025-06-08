import { EventRegisterFormField } from '@/types/event/form'

export const EVENT_REGISTER_FORM_FIELDS: EventRegisterFormField[] = [
  {
    name: 'name',
    label: 'イベント名',
    required: true,
    elementType: 'input',
    inputType: 'text',
    placeholder: 'イベント名を入力してください'
  },
  {
    name: 'description',
    label: 'イベントの概要',
    required: true,
    elementType: 'textarea',
    placeholder: 'イベントの概要を入力してください'
  },
  {
    name: 'userGroupId',
    label: 'イベントグループ',
    required: true,
    elementType: 'select',
    placeholder: 'イベントグループを選択してください'
  },
  {
    name: 'eventDate',
    label: 'イベント日',
    required: true,
    elementType: 'input',
    inputType: 'date'
  },
  {
    name: 'eventStartTime',
    label: '開始時刻',
    required: true,
    elementType: 'input',
    inputType: 'time'
  },
  {
    name: 'eventEndTime',
    label: '終了時刻',
    required: true,
    elementType: 'input',
    inputType: 'time'
  },
  {
    name: 'eventUrl',
    label: 'イベントの詳細URL',
    required: false,
    elementType: 'input',
    inputType: 'text',
    placeholder: 'https://example.com'
  },
  {
    name: 'venueUrl',
    label: '会場のURL',
    required: false,
    elementType: 'input',
    inputType: 'text',
    placeholder: 'https://example.com'
  }
];