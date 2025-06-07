import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/atoms/shadcn/dialog"
import { Button } from "@/components/atoms/shadcn/button"
import { useEffect, useState } from "react"
interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onTextChange: (text: string) => void
  onAdd: () => void
}

export default function TextDialog({ isOpen, onOpenChange, onTextChange, onAdd}: Readonly<Props>) {
  const [isChanged, setIsChanged] = useState(false)
  
  useEffect(() => {
    setIsChanged(false)
    onTextChange('')
  }, [isOpen])
  
  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isChanged) {
      onAdd()
    }
    onOpenChange(false)
  }

  const changeText = (text: string) => {
    onTextChange(text)
    setIsChanged(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[300px]">
        <form onSubmit={formAction}>
          <DialogHeader>
            <DialogTitle>テキストを入力</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeText(e.target.value)}
              placeholder="テキストを入力してください"
              className="w-full p-2 border rounded"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
            <Button type="submit">
              追加
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 