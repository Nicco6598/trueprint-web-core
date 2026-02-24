'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/certificates', label: 'Certificati', icon: ShieldCheck },
  { href: '/dashboard/settings', label: 'Impostazioni', icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-0.5">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 border-l-2 px-3 py-2 text-sm transition-colors',
              isActive
                ? 'border-background bg-background/10 text-background font-medium'
                : 'text-background/45 hover:border-background/30 hover:bg-background/5 hover:text-background/75 border-transparent font-normal'
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
