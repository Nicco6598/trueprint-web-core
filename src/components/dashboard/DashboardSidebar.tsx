import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './SidebarNavItem'

export function DashboardSidebar() {
  return (
    <aside className="bg-background flex h-full w-60 flex-col border-r px-4 py-6">
      <div className="mb-6 px-2">
        <span className="text-lg font-bold tracking-tight">Trueprint</span>
        <p className="text-muted-foreground text-xs">Brand Dashboard</p>
      </div>

      <Separator className="mb-4" />

      <SidebarNav />
    </aside>
  )
}
