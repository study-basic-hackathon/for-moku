import { CommonRegisterFormField } from "../common/form";

/**
 * イベント登録フォーム
 * 
 * @returns フォーム
 */
export type EventRegisterForm = {
  // 必須項目
  name: string;
  description: string;
  userGroupId: number;
  
  // 日時関連
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  
  // URL関連
  eventUrl?: string;
  venueUrl?: string;
};

/**
 * イベント登録フォームのフィールド定義の型
 * 
 * @returns フィールド
 */
export type EventRegisterFormField = CommonRegisterFormField<EventRegisterForm>;