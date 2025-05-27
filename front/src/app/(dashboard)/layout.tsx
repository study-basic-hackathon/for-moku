import { SidebarProvider } from "@/components/atoms/shadcn/sidebar"
import { SideNav } from "@/components/organisms/SideNav"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="w-full">
        <div className="pt-14">{children}</div>
      </main>
    </SidebarProvider>
  )
}