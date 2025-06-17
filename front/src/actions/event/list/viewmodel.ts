import { auth } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import { EventListItem, EventListViewModel } from "@/types/event/viewmodel"
import { Role } from "@/types/event/role";


type MockEvent = {
  id: number;
  name: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  userGroupName: string;
  role: Role;
}

// モックデータ
const mockEvents: MockEvent[] = [
  {
    id: 1,
    name: "ハッカソン2025",
    description: "24時間でアプリを開発するハッカソンイベント",
    startDateTime: new Date("2025-05-01T10:00:00"),
    endDateTime: new Date("2025-05-02T10:00:00"),
    userGroupName: "開発チームA",
    role: "admin",
  },
  {
    id: 2,
    name: "技術勉強会",
    description: "最新技術について学ぶ勉強会",
    startDateTime: new Date("2025-05-15T19:00:00"),
    endDateTime: new Date("2025-05-15T21:00:00"),
    userGroupName: "技術部",
    role: "admin",
  },
  {
    id: 3,
    name: "プロジェクトキックオフ",
    description: "新規プロジェクトの開始ミーティング",
    startDateTime: new Date("2025-05-20T13:00:00"),
    endDateTime: new Date("2025-05-20T15:00:00"),
    userGroupName: "プロジェクトチーム",
    role: "member",
  },
  {
    id: 4,
    name: "デザインワークショップ",
    description: "UI/UXデザインの基礎を学ぶワークショップ",
    startDateTime: new Date("2025-05-25T10:00:00"),
    endDateTime: new Date("2025-05-25T17:00:00"),
    userGroupName: "デザインチーム",
    role: "member",
  },
  {
    id: 5,
    name: "コードレビュー会",
    description: "チーム内のコードレビューと改善点の共有",
    startDateTime: new Date("2025-06-01T15:00:00"),
    endDateTime: new Date("2025-06-01T17:00:00"),
    userGroupName: "開発チームB",
    role: "member",
  },
  {
    id: 6,
    name: "新入社員研修",
    description: "新入社員向けの技術研修",
    startDateTime: new Date("2025-06-05T09:00:00"),
    endDateTime: new Date("2025-06-07T17:00:00"),
    userGroupName: "人事部",
    role: "member",
  },
  {
    id: 7,
    name: "プロダクト戦略会議",
    description: "次期プロダクトの戦略を議論する会議",
    startDateTime: new Date("2025-06-10T13:00:00"),
    endDateTime: new Date("2025-06-10T15:00:00"),
    userGroupName: "プロダクトチーム",
    role: "member",
  },
  {
    id: 8,
    name: "セキュリティ研修",
    description: "セキュリティの基礎知識とベストプラクティスを学ぶ",
    startDateTime: new Date("2025-06-15T10:00:00"),
    endDateTime: new Date("2025-06-15T16:00:00"),
    userGroupName: "セキュリティチーム",
    role: "member",
  },
  {
    id: 9,
    name: "チームビルディング",
    description: "チームの結束を高めるためのアクティビティ",
    startDateTime: new Date("2025-06-20T09:00:00"),
    endDateTime: new Date("2025-06-20T17:00:00"),
    userGroupName: "全チーム",
    role: "member",
  },
  {
    id: 10,
    name: "技術カンファレンス",
    description: "最新技術動向の共有と議論",
    startDateTime: new Date("2025-06-25T10:00:00"),
    endDateTime: new Date("2025-06-26T17:00:00"),
    userGroupName: "技術部",    
    role: "member",
  },
  {
    id: 11,
    name: "プロジェクト振り返り",
    description: "プロジェクトの成果と課題の振り返り",
    startDateTime: new Date("2025-07-01T14:00:00"),
    endDateTime: new Date("2025-07-01T16:00:00"),                       
    userGroupName: "プロジェクトチーム",
    role: "member",
  },
  {
    id: 12,
    name: "マネージャー研修",
    description: "マネジメントスキルの向上を目指す研修",
    startDateTime: new Date("2025-07-05T09:00:00"),
    endDateTime: new Date("2025-07-05T17:00:00"),
    userGroupName: "管理職",
    role: "admin",
  },
  {
    id: 13,
    name: "QAワークショップ",
    description: "品質保証の手法とツールの学習",
    startDateTime: new Date("2025-07-10T10:00:00"),
    endDateTime: new Date("2025-07-10T16:00:00"),
    userGroupName: "QAチーム",
    role: "admin",
  },
  {
    id: 14,
    name: "インフラ勉強会",
    description: "クラウドインフラの最新動向と運用",
    startDateTime: new Date("2025-07-15T13:00:00"),
    endDateTime: new Date("2025-07-15T15:00:00"),
    userGroupName: "インフラチーム",
    role: "admin",
  },
  {
    id: 15,
    name: "UXリサーチ",
    description: "ユーザー体験の改善に向けた調査と分析",
    startDateTime: new Date("2025-07-20T10:00:00"),
    endDateTime: new Date("2025-07-20T17:00:00"),
    userGroupName: "UXチーム",
    role: "member",
  },
  {
    id: 16,
    name: "アーキテクチャレビュー",
    description: "システムアーキテクチャの設計レビュー",
    startDateTime: new Date("2025-07-25T14:00:00"),
    endDateTime: new Date("2025-07-25T16:00:00"),
    userGroupName: "アーキテクトチーム",
    role: "member",
  },
  {
    id: 17,
    name: "パフォーマンス最適化",
    description: "アプリケーションのパフォーマンス改善",
    startDateTime: new Date("2025-08-01T10:00:00"),
    endDateTime: new Date("2025-08-01T17:00:00"),
    userGroupName: "パフォーマンスチーム",
    role: "member",
  },
  {
    id: 18,
    name: "セキュリティ監査",
    description: "システムのセキュリティ監査と改善",
    startDateTime: new Date("2025-08-05T09:00:00"),
    endDateTime: new Date("2025-08-05T17:00:00"),
    userGroupName: "セキュリティチーム",
    role: "member",
  },
  {
    id: 19,
    name: "技術書輪読会",
    description: "技術書の内容を共有し議論する会",
    startDateTime: new Date("2025-08-10T19:00:00"),
    endDateTime: new Date("2025-08-10T21:00:00"),
    userGroupName: "開発チームA", 
    role: "member",
  },
  {
    id: 20,
    name: "プロジェクト計画会議",
    description: "次期プロジェクトの計画と目標設定",
    startDateTime: new Date("2025-08-15T13:00:00"),
    endDateTime: new Date("2025-08-15T15:00:00"),
    userGroupName: "プロジェクトチーム",
    role: "member",
  }
];

/**
 * イベント一覧用のビューモデルを取得する
 * @returns イベント一覧用のビューモデル
 */
export const getEventListViewModel = async (): Promise<EventListViewModel> => {
  const session = await auth();
  if (!session?.user) {
    redirect('/user/register');
  }
  if (!session.user.email) {
    notFound();
  }

  // TODO: 現時点ではモックデータを使用しているが、データベースから取得するようにする
  const events = mockEvents;

  // イベントの一覧をビューモデルに変換
  const eventListItems: EventListItem[] = events.map((event) => ({
    id: event.id.toString(),
    name: event.name,
    description: event.description,
    startDateTime: event.startDateTime.toISOString(),
    endDateTime: event.endDateTime.toISOString(),
    userGroupName: event.userGroupName,
    role: event.role,
  }));

  return {
    events: eventListItems,
  };
}; 