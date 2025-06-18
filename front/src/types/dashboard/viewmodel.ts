/**
 * カレンダーに表示するイベントのユニット
 * 
 * 
 * @param title イベントのタイトル
 * @param startDateTime イベントの開始日時
 * @param endDateTime イベントの終了日時
 * @param description イベントの説明
 * @param backgroundColor イベントの背景色
 * @param borderColor イベントの枠線色
 * @param unitUrl イベントのURL (当日URLの場合もあれば　、イベント詳細URLの場合もある) 
 */
export type EventCalendarUnit = {
  title: string;
  startDateTime: string;
  endDateTime: string;
  description: string;
  backgroundColor: string;
  borderColor: string;
  unitUrl: string;
};

/**
 * ダッシュボード画面用のビューモデル
 * 
 * template内でデータを扱う際に使います（基本的にはStringのレコードを持つだけにとどめましょう）
 */
export type DashboardViewModel = {
  eventCalendarUnits: EventCalendarUnit[];
};
