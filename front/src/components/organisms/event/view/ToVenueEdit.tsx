import { Pencil } from "lucide-react";
import MenuIconLinkUnit from "@/components/molecules/MenuIconLinkUnit";

export default function DescriptionIconUnit() {
  return (
    <MenuIconLinkUnit 
      icon={Pencil}
      title="編集"
      href="/event/venueedit/sample"
      targetBlank={false}
    />
  )
} 