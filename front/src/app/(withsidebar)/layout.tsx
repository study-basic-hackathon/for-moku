import { SidebarProvider } from "@/components/atoms/shadcn/sidebar"
import { SideNav } from "@/components/organisms/SideNav"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideNav />
      <div className="w-full">
        {children}
      </div>
    </SidebarProvider>
  )
}