'use server';

import { z } from 'zod'
import { FormState } from '@/types/common/form';
import { DATE_PATTERN, TIME_PATTERN } from '@/lib/util/constants';
import { selectEventById, updateEvent } from '@/lib/db/event';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Event, UpdateEvent } from "@/types/event/schema";

/**
 * 単一バリデーション
 */
const BaseSchema = z.object({
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
    .regex(DATE_PATTERN, 'イベント日はYYYY-MM-DD形式で入力してください。')
    .refine((date) => !isNaN(Date.parse(date)), '有効な日付を入力してください。'),
  eventStartTime: z.string()
    .regex(TIME_PATTERN, '開始時刻はHH:mm形式で入力してください。'),
  eventEndTime: z.string()
    .regex(TIME_PATTERN, '終了時刻はHH:mm形式で入力してください。'),
  eventUrl: z.string().url('イベントの詳細URLが有効な形式ではありません。').optional().or(z.literal('')),
  venueUrl: z.string().url('会場のURLが有効な形式ではありません。').optional().or(z.literal(''))
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
 * 相関バリデーション（開始時刻と終了時刻の比較）
 */
const FormSchema = BaseSchema.refine(
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


const createUpdateEventEntity = (oldEvent: Event, validatedFields: any): UpdateEvent => {
  const { eventDate, eventStartTime, eventEndTime, ...rest } = validatedFields.data;
  const {id: _, ...restWithoutId} = oldEvent;

  return {
    ...restWithoutId,
    ...rest,
    startDateTime: new Date(`${eventDate}T${eventStartTime}:00.000`),
    endDateTime: new Date(`${eventDate}T${eventEndTime}:00.000`),
  };
};

/**
 * イベントを登録
 * 
 * @param prevState 前回の状態
 * @param formData フォームデータ
 * @returns 処理結果（エラーがあれば、エラーとフォームデータが返却される）
 */
export async function updateEventInfo(
  prevState: FormState,
  formData: FormData,
  eventId: number
): Promise<FormState> {

  // まず基本バリデーションを実行
  const baseValidation = BaseSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    userGroupId: formData.get('userGroupId'),
    eventDate: formData.get('eventDate'),
    eventStartTime: formData.get('eventStartTime'),
    eventEndTime: formData.get('eventEndTime'),
    eventUrl: formData.get('eventUrl'),
    venueUrl: formData.get('venueUrl')
  });

  // 基本バリデーションでエラーがあれば、そのエラーを返却
  if (!baseValidation.success) {
    return {
      error: baseValidation.error.errors,
      formData: Object.fromEntries(formData.entries())
    };
  }

  // 基本バリデーションが成功した場合のみ、時刻の比較バリデーションを実行
  const validatedFields = FormSchema.safeParse(baseValidation.data);

  // バリデーションエラーがあれば、エラーとフォームデータを返却
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors,
      formData: Object.fromEntries(formData.entries())
    };
  }

  const oldEvent = await selectEventById(eventId);

  if (!oldEvent) {
    return {
      error: [{ 
        message: 'イベントが見つかりませんでした。もう一度試してください',
        code: 'custom',
        path: []
      }],
      formData: Object.fromEntries(formData.entries())
    };
  }

  // DBにすでにあるデータとフォームデータを結合して、新しいイベントエンティティを作成
  const newEvent = createUpdateEventEntity(oldEvent, validatedFields);

  // イベントの登録処理(トランザクションは正直なくてもいいけど、lib/db側の記述がシンプルになるために使用)
  const updatedEvent = await db.transaction(async (tx) => {
    return await updateEvent(tx, eventId, newEvent);
  });

  // イベントの更新に失敗した場合はエラーを返却
  if (!updatedEvent) {
    return {
      error: [{ 
        message: 'イベントの更新に失敗しました。もう一度試してください',
        code: 'custom',
        path: []
      }],
      formData: Object.fromEntries(formData.entries())
    };
  }

  revalidatePath(`/event/edit/${updatedEvent.id}`);
  redirect(`/event/view/${updatedEvent.id}`);
}