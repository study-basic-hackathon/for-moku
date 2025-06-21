import {
  Calendar,
  FileQuestion,
  FileText,
  Home,
  Plus,
  Search,
  UserPen,
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
    url: "/event/list",
    icon: Calendar,
  },
  {
    title: "イベント作成",
    url: "/event/register",
    icon: Plus,
  },
  {
    title: "プロフィール",
    url: "/user/edit",
    icon: UserPen,
  },
  {
    title: "グループ管理",
    url: "/user_group/list",
    icon: Users,
  },
  {
    title: "イベント詳細サンプル",
    url: "/event/view/sample",
    icon: FileText,
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
