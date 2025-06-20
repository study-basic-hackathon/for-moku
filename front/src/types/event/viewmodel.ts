import { Role } from "@/types/event/role";

/**
 * イベント詳細画面用のビューモデル
 * 
 * template内でデータを扱う際に使います（基本的にはStringのレコードを持つだけにとどめましょう）
 */
export type EventViewViewModel = {
  eventId: number;
  eventName: string;
  eventShareLinkUrl: string;
  description: string;
  eventStartDateTime: string;
  eventEndDateTime: string;
  eventUrl?: string;
  venueUrl?: string;
  userGroupName: string;
  userGroupUrl: string;
  imageUrl?: string;
  isAdmin: boolean;
};

/**
 * イベント会場編集画面用のビューモデル
 * 
 * template内でデータを扱う際に使います（基本的にはStringのレコードを持つだけにとどめましょう）
 */
export type EventVenueEditViewModel = {
  eventId: number;
  eventName: string;
  imageJson?: JSON;
};

/**
 * イベント編集画面用のビューモデル
 * 
 * template内でデータを扱う際に使います（基本的にはStringのレコードを持つだけにとどめましょう）
 */
export type EventEditViewModel = {
  eventId: number;
  eventName: string;
  description: string;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventUrl?: string;
  venueUrl?: string;
};

/**
 * イベント一覧画面用のビューモデル
 * 
 * template内でデータを扱う際に使います
 */
export type EventListItem = {
  id: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  userGroupName: string;
  role: Role;
}


/**
 * イベント一覧画面用のビューモデル（実質データベースから取得したイベントの一覧のみ）
 * 
 * template内でデータを扱う際に使います
 */
export type EventListViewModel = {
  events: EventListItem[];
}