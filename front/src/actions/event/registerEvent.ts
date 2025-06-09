'use server';

import { z } from 'zod'
import { FormState } from '@/types/common/form';
import { DATE_PATTERN, TIME_PATTERN } from '@/lib/util/constants';

// FromSchema (エラー文も指定できる)
const FormSchema = z.object({
  name: z.string({
    required_error: 'イベント名は必須です。',
  }),
  description: z.string({
    required_error: 'イベントの説明は必須です。',
  }),
  userGroupId: z.coerce.number({
    required_error: 'ユーザーグループは必須です。',
  }),
  eventDate: z.string()
    .regex(DATE_PATTERN, '日付はYYYY-MM-DD形式で入力してください。')
    .refine((date) => !isNaN(Date.parse(date)), '有効な日付を入力してください。'),
  eventStartTime: z.string()
    .regex(TIME_PATTERN, '時刻はHH:mm形式で入力してください。'),
  eventEndTime: z.string()
    .regex(TIME_PATTERN, '時刻はHH:mm形式で入力してください。'),
  eventUrl: z.string().url('有効なURLを入力してください。').optional().or(z.literal('')),
  venueUrl: z.string().url('有効なURLを入力してください。').optional().or(z.literal(''))
}).refine(
  (data) => {
    const startTime = new Date(`${data.eventDate}T${data.eventStartTime}`);
    const endTime = new Date(`${data.eventDate}T${data.eventEndTime}`);
    return startTime < endTime;
  },
  {
    message: '終了時刻は開始時刻より後である必要があります。',
    path: ['eventEndTime']
  }
);

/**
 * イベントを登録
 * 
 * @param prevState 前回の状態
 * @param formData フォームデータ
 * @returns 処理結果（エラーがあれば、エラーとフォームデータが返却される）
 */
export async function registerEvent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const validatedFields = FormSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    userGroupId: formData.get('userGroupId'),
    eventDate: formData.get('eventDate'),
    eventStartTime: formData.get('eventStartTime'),
    eventEndTime: formData.get('eventEndTime'),
    eventUrl: formData.get('eventUrl'),
    venueUrl: formData.get('venueUrl')
  });

  // バリデーションエラーがあれば、エラーとフォームデータを返却
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors,
      formData: Object.fromEntries(formData.entries()) // オブジェクトっぽいやつからオブジェクトライクなものに変換する
    };
  }

  // TODO: イベントの登録処理を実装
  return { error: [], formData: undefined };
}