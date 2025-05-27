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
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/atoms/shadcn/sidebar";
import Link from "next/link";

const items = [
  {
    title: "ダッシュボード",
    url: "#",
    icon: Home,
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
                    <a href={item.url}>
                      <item.icon className="ml-4 mr-2"/>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuButton asChild>
                <Link href="/#">
                  <Calendar className="ml-4 mr-2"/>
                  イベント一覧
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/#">
                  <Plus className="ml-4 mr-2"/>
                  イベント作成
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/#">
                  <Users className="ml-4 mr-2"/>
                  グループ管理
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/#">
                  <Search className="ml-4 mr-2"/>
                  グループ検索
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton asChild>
                <Link href="/#">
                  <FileQuestion className="ml-4 mr-2"/>
                  Menu Item
                </Link>
              </SidebarMenuButton>
          </SidebarMenu> 
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
