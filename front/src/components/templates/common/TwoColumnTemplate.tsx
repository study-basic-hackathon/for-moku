import { ReactNode } from "react"

interface TwoColumnTemplateProps {
  header: ReactNode
  leftContent: ReactNode
  rightContent: ReactNode
}

export default function TwoColumnTemplate({
  header,
  leftContent,
  rightContent
}: TwoColumnTemplateProps) {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg flex flex-col">
            {header}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
              <div className="col-span-1">
                {leftContent}
              </div>
              <div className="col-span-1">
                {rightContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 