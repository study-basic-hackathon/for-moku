import { ReactNode } from "react"

interface TwoColumnTemplateProps {
  header?: ReactNode
  leftContent: ReactNode
  rightContent: ReactNode
}

/**
 * 2カラムのテンプレート
 * 
 * このコンポーネントは、2カラムのテンプレートを表示します。
 * 
 * スタイルのカスタマイズ:
 * - header: ヘッダーのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * - leftContent: 左カラムのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * - rightContent: 右カラムのスタイルをカスタマイズします（例：背景色、パディング、ホバー効果など）
 * 
 * 使用例:
 * ```tsx
 * <TwoColumnTemplate
 *   header={<Header />}
 *   leftContent={<LeftContent />}
 *   rightContent={<RightContent />}
 * />
 */
export default function TwoColumnTemplate({
  header,
  leftContent,
  rightContent
}: Readonly<TwoColumnTemplateProps>) {
  return (
    <div className="h-max-screen">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="px-4 pt-2 sm:px-0">
          <div className="rounded-lg flex flex-col">
            {header}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
              <div className="col-span-1 pt-2">
                {leftContent}
              </div>
              <div className="col-span-1 pt-2">
                {rightContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 