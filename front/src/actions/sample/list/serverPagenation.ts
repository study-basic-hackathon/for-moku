import { auth } from "@/lib/auth/auth";
import { Role } from "@/types/event/role";
import { EventListItem } from "@/types/event/viewmodel";
import { notFound, redirect } from "next/navigation";


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
    name: "ハッカソン2024",
    description: "24時間でアプリを開発するハッカソンイベント",
    startDateTime: new Date("2024-05-01T10:00:00"),
    endDateTime: new Date("2024-05-02T10:00:00"),
    userGroupName: "開発チームA",
    role: "admin"
  },
  {
    id: 2,
    name: "技術勉強会",
    description: "最新技術について学ぶ勉強会",
    startDateTime: new Date("2024-05-15T19:00:00"),
    endDateTime: new Date("2024-05-15T21:00:00"),
    userGroupName: "技術部",
    role: "admin"
  },
  {
    id: 3,
    name: "プロジェクトキックオフ",
    description: "新規プロジェクトの開始ミーティング",
    startDateTime: new Date("2024-05-20T13:00:00"),
    endDateTime: new Date("2024-05-20T15:00:00"),
    userGroupName: "プロジェクトチーム",
    role: "admin"
  },
  {
    id: 4,
    name: "デザインワークショップ",
    description: "UI/UXデザインの基礎を学ぶワークショップ",
    startDateTime: new Date("2024-05-25T10:00:00"),
    endDateTime: new Date("2024-05-25T17:00:00"),
    userGroupName: "デザインチーム",
    role: "admin"
  },
  {
    id: 5,
    name: "コードレビュー会",
    description: "チーム内のコードレビューと改善点の共有",
    startDateTime: new Date("2024-06-01T15:00:00"),
    endDateTime: new Date("2024-06-01T17:00:00"),
    userGroupName: "開発チームB",
    role: "admin"
  },
  {
    id: 6,
    name: "新入社員研修",
    description: "新入社員向けの技術研修",
    startDateTime: new Date("2024-06-05T09:00:00"),
    endDateTime: new Date("2024-06-07T17:00:00"),
    userGroupName: "人事部",
    role: "admin"
  },
  {
    id: 7,
    name: "プロダクト戦略会議",
    description: "次期プロダクトの戦略を議論する会議",
    startDateTime: new Date("2024-06-10T13:00:00"),
    endDateTime: new Date("2024-06-10T15:00:00"),
    userGroupName: "プロダクトチーム",
    role: "admin"
  },
  {
    id: 8,
    name: "セキュリティ研修",
    description: "セキュリティの基礎知識とベストプラクティスを学ぶ",
    startDateTime: new Date("2024-06-15T10:00:00"),
    endDateTime: new Date("2024-06-15T16:00:00"),
    userGroupName: "セキュリティチーム",
    role: "admin"
  },
  {
    id: 9,
    name: "チームビルディング",
    description: "チームの結束を高めるためのアクティビティ",
    startDateTime: new Date("2024-06-20T09:00:00"),
    endDateTime: new Date("2024-06-20T17:00:00"),
    userGroupName: "全チーム",  
    role: "admin"
  },
  {
    id: 10,
    name: "技術カンファレンス",
    description: "最新技術動向の共有と議論",
    startDateTime: new Date("2024-06-25T10:00:00"),
    endDateTime: new Date("2024-06-26T17:00:00"),
    userGroupName: "技術部",
    role: "admin"
  },
  {
    id: 11,
    name: "プロジェクト振り返り",
    description: "プロジェクトの成果と課題の振り返り",
    startDateTime: new Date("2024-07-01T14:00:00"),
    endDateTime: new Date("2024-07-01T16:00:00"),                       
    userGroupName: "プロジェクトチーム",
    role: "member"
  },
  {
    id: 12,
    name: "マネージャー研修",
    description: "マネジメントスキルの向上を目指す研修",
    startDateTime: new Date("2024-07-05T09:00:00"),
    endDateTime: new Date("2024-07-05T17:00:00"),
    userGroupName: "管理職",
    role: "member"
  },
  {
    id: 13,
    name: "QAワークショップ",
    description: "品質保証の手法とツールの学習",
    startDateTime: new Date("2024-07-10T10:00:00"),
    endDateTime: new Date("2024-07-10T16:00:00"),
    userGroupName: "QAチーム",
    role: "member"
  },
  {
    id: 14,
    name: "インフラ勉強会",
    description: "クラウドインフラの最新動向と運用",
    startDateTime: new Date("2024-07-15T13:00:00"),
    endDateTime: new Date("2024-07-15T15:00:00"),
    userGroupName: "インフラチーム",
    role: "member"
  },
  {
    id: 15,
    name: "UXリサーチ",
    description: "ユーザー体験の改善に向けた調査と分析",
    startDateTime: new Date("2024-07-20T10:00:00"),
    endDateTime: new Date("2024-07-20T17:00:00"),
    userGroupName: "UXチーム",
    role: "member"
  },
  {
    id: 16,
    name: "アーキテクチャレビュー",
    description: "システムアーキテクチャの設計レビュー",
    startDateTime: new Date("2024-07-25T14:00:00"),
    endDateTime: new Date("2024-07-25T16:00:00"),
    userGroupName: "アーキテクトチーム",
    role: "member"
  },
  {
    id: 17,
    name: "パフォーマンス最適化",
    description: "アプリケーションのパフォーマンス改善",
    startDateTime: new Date("2024-08-01T10:00:00"),
    endDateTime: new Date("2024-08-01T17:00:00"),
    userGroupName: "パフォーマンスチーム",
    role: "member"
  },
  {
    id: 18,
    name: "セキュリティ監査",
    description: "システムのセキュリティ監査と改善",
    startDateTime: new Date("2024-08-05T09:00:00"),
    endDateTime: new Date("2024-08-05T17:00:00"),
    userGroupName: "セキュリティチーム",
    role: "member"
  },
  {
    id: 19,
    name: "技術書輪読会",
    description: "技術書の内容を共有し議論する会",
    startDateTime: new Date("2024-08-10T19:00:00"),
    endDateTime: new Date("2024-08-10T21:00:00"),
    userGroupName: "開発チームA",
    role: "member"
  },
  {
    id: 20,
    name: "プロジェクト計画会議",
    description: "次期プロジェクトの計画と目標設定",
    startDateTime: new Date("2024-08-15T13:00:00"),
    endDateTime: new Date("2024-08-15T15:00:00"),
    userGroupName: "プロジェクトチーム",    
    role: "member"
  }
];

type SortDirection = "asc" | "desc";

type GetEventListParams = {
  search?: string;
  page?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: SortDirection;
}

/**
 * イベント一覧用のビューモデルを取得する
 * サーバーサイドでページネーションを行うサンプル
 * 本来DBでやる処理をactionsで無理やりやっている点に注意
 * 
 * @param params 検索パラメータ
 * @returns イベント一覧用のビューモデル
 */
export const getEventListViewModelServerPagenationSample = async (params: GetEventListParams = {}): Promise<{
  events: EventListItem[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}> => {
  const session = await auth();
  if (!session || !session.user) {
    redirect('/user/register');
  }
  if (!session.user.email) {
    notFound();
  }

  // パラメータの設定
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 5;
  const offset = (page - 1) * pageSize;

  // モックデータを使用
  let events = mockEvents;
  
  // 検索条件がある場合はフィルタリング
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    events = events.filter(event => 
      event.name.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower)
    );
  }

  // ソート
  if (params.sortColumn) {
    events.sort((a, b) => {
      const aValue = a[params.sortColumn as keyof MockEvent];
      const bValue = b[params.sortColumn as keyof MockEvent];
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return params.sortDirection === "desc" 
          ? bValue.getTime() - aValue.getTime()
          : aValue.getTime() - bValue.getTime();
      }
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return params.sortDirection === "desc"
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }
      
      return 0;
    });
  }
  
  const totalCount = events.length;
  
  // ページネーション
  events = events.slice(offset, offset + pageSize);
  
  // イベントの一覧をビューモデルに変換
  const eventListItems: EventListItem[] = events.map((event) => ({
    id: event.id.toString(),
    name: event.name,
    description: event.description,
    startDateTime: event.startDateTime.toISOString(),
    endDateTime: event.endDateTime.toISOString(),
    userGroupName: event.userGroupName,
    role: event.role
  }));

  return {
    events: eventListItems,
    totalCount,
    currentPage: page,
    totalPages: Math.ceil(totalCount / pageSize),
    pageSize
  };
}; 