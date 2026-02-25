'use client'

import { usePathname } from 'next/navigation'

const labels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/certificates': 'Certificati',
  '/dashboard/settings': 'Impostazioni',
}

export function PageBreadcrumb() {
  const pathname = usePathname()
  return (
    <p className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
      {labels[pathname] ?? 'Dashboard'}
    </p>
  )
}
