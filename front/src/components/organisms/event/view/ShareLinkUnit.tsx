import { Link2 } from "lucide-react";
import MenuIconLinkUnit from "@/components/molecules/MenuIconLinkUnit";

export default function EventShareLink() {
  return (
    <MenuIconLinkUnit 
      icon={Link2}
      title="localhost:3000/room/sample"
      href="/room/sample"
    />
  );
} 