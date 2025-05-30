import { Bell } from "lucide-react";
import MenuIconUnit from "@/components/molecules/MenuIconUnit";

export default function SampleAtomic4() {
  return (
    <MenuIconUnit 
      icon={Bell}
      title="テキストにクラスを適用した時"
      titleClassName="text-green-500"
    />
  )
} 