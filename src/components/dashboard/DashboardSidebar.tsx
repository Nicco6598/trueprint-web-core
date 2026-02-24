import Link from 'next/link'
import { LayoutDashboard, ShieldCheck, Settings } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/certificates', label: 'Certificates', icon: ShieldCheck },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
  return (
    <aside className="bg-background flex h-full w-60 flex-col border-r px-4 py-6">
      <div className="mb-6 px-2">
        <span className="text-lg font-bold tracking-tight">Trueprint</span>
        <p className="text-muted-foreground text-xs">Brand Dashboard</p>
      </div>

      <Separator className="mb-4" />

      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
