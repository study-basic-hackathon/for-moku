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
