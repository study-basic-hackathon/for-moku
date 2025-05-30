import { User } from "lucide-react";
import MenuIconUnit from "@/components/molecules/MenuIconUnit";

export default function SampleAtomic2() {
  return (
    <MenuIconUnit 
      icon={User}
      title="div全体にクラスを適用した時"
      divClassName="text-red-500 items-center"
    />
  )
} 