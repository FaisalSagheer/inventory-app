
import { Suspense } from "react"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar"
import { Spinner } from "../../components/ui/spinner"
import { Turtle } from "lucide-react"
import Loading from "../../components/Loading"
import Dashboard from "./page"


export default function dashboardlayout({ children }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


