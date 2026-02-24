import { ShieldCheck } from 'lucide-react'
import { SidebarNav } from './SidebarNavItem'

export function DashboardSidebar() {
  return (
    <aside className="bg-foreground text-background flex h-full w-56 shrink-0 flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-5">
        <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.5} />
        <span className="text-sm font-semibold tracking-tight">Trueprint</span>
      </div>

      <div className="bg-background/10 mx-6 h-px" />

      {/* Nav */}
      <div className="flex-1 px-3 py-4">
        <SidebarNav />
      </div>

      {/* Footer */}
      <div className="px-6 pb-5">
        <p className="text-background/25 text-[10px] tracking-[0.12em] uppercase">Brand Portal</p>
      </div>
    </aside>
  )
}
