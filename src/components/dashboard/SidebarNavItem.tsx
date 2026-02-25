'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mockCertificates } from '@/lib/mock-data'

const draftCount = mockCertificates.filter((c) => c.status === 'draft').length

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
                ? 'bg-background/10 text-background border-lime-400 font-medium'
                : 'text-background/45 hover:border-background/30 hover:bg-background/5 hover:text-background/75 border-transparent font-normal'
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
            {label}
            {href === '/dashboard/certificates' && draftCount > 0 && (
              <span className="ml-auto bg-amber-400 px-1.5 py-0.5 text-[9px] leading-none font-semibold text-amber-900">
                {draftCount}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
