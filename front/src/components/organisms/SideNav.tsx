import {
  Calendar,
  FileQuestion,
  Home,
  Plus,
  Search,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/atoms/shadcn/sidebar";
import Link from "next/link";

const items = [
  {
    title: "ダッシュボード",
    url: "/#",
    icon: Home,
  },
  {
    title: "イベント一覧",
    url: "/#",
    icon: Calendar,
  },
  {
    title: "イベント作成",
    url: "/#",
    icon: Plus,
  },
  {
    title: "グループ管理",
    url: "/#",
    icon: Users,
  },
  {
    title: "グループ検索",
    url: "/#",
    icon: Search,
  },
  {
    title: "Menu Item",
    url: "/#",
    icon: FileQuestion,
  },
  
]
 
export function SideNav() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="pt-6 px-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="ml-4 mr-2"/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu> 
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
