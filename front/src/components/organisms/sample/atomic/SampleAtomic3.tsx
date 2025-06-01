import { Settings } from "lucide-react";
import MenuIconUnit from "@/components/molecules/MenuIconUnit";

export default function SampleAtomic3() {
  return (
    <MenuIconUnit 
      icon={Settings}
      title="アイコンにクラスを適用した時"
      iconClassName="text-blue-500"
    />
  )
} 