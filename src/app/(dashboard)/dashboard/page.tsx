import { FileCheck, FileText, ShieldCheck, ShieldOff } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CreateCertificateDialog } from '@/components/certificates/CreateCertificateDialog'
import { StatusBadge } from '@/components/certificates/StatusBadge'
import { getMockStats, mockCertificates } from '@/lib/mock-data'

const statCards = [
  {
    title: 'Totale',
    key: 'total' as const,
    trendKey: 'totalThisMonth' as const,
    icon: FileCheck,
    accentBorder: 'border-t-sky-400',
    bgTint: 'bg-sky-50',
    iconClass: 'text-sky-500',
    valueClass: 'text-foreground',
  },
  {
    title: 'Attivi',
    key: 'active' as const,
    trendKey: 'activeThisMonth' as const,
    icon: ShieldCheck,
    accentBorder: 'border-t-emerald-400',
    bgTint: 'bg-emerald-50',
    iconClass: 'text-emerald-500',
    valueClass: 'text-emerald-700',
  },
  {
    title: 'In bozza',
    key: 'draft' as const,
    trendKey: 'draftThisMonth' as const,
    icon: FileText,
    accentBorder: 'border-t-amber-400',
    bgTint: 'bg-amber-50',
    iconClass: 'text-amber-500',
    valueClass: 'text-amber-700',
  },
  {
    title: 'Revocati',
    key: 'revoked' as const,
    trendKey: 'revokedThisMonth' as const,
    icon: ShieldOff,
    accentBorder: 'border-t-rose-500',
    bgTint: 'bg-rose-50',
    iconClass: 'text-rose-500',
    valueClass: 'text-rose-600',
  },
]

export default function DashboardPage() {
  const stats = getMockStats()
  const recent = mockCertificates.slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between border-b pb-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Panoramica delle certificazioni del tuo brand.
          </p>
        </div>
        <CreateCertificateDialog />
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map(
          ({ title, key, trendKey, icon: Icon, accentBorder, bgTint, iconClass, valueClass }) => (
            <div key={key} className={`border border-t-2 p-4 ${accentBorder} ${bgTint}`}>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-[10px] font-medium tracking-[0.12em] uppercase">
                  {title}
                </p>
                <Icon className={`h-3.5 w-3.5 ${iconClass}`} strokeWidth={1.5} />
              </div>
              <p className={`mt-3 text-3xl font-bold tracking-tight ${valueClass}`}>{stats[key]}</p>
              {stats[trendKey] > 0 && (
                <p className="text-muted-foreground mt-1 text-[10px]">
                  +{stats[trendKey]} questo mese
                </p>
              )}
            </div>
          )
        )}
      </div>

      {/* Activity feed */}
      <div className="bg-card border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="text-sm font-medium">Attività recente</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Ultimi {recent.length} certificati emessi
            </p>
          </div>
          <Link
            href="/dashboard/certificates"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Vedi tutti →
          </Link>
        </div>
        <div className="divide-y">
          {recent.map((cert) => (
            <div key={cert.id} className="flex items-center gap-3 px-4 py-3">
              <div
                className={cn('h-1.5 w-1.5 shrink-0', {
                  'bg-emerald-400': cert.status === 'active',
                  'bg-amber-400': cert.status === 'draft',
                  'bg-rose-400': cert.status === 'revoked',
                })}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{cert.productName}</p>
                <p className="text-muted-foreground font-mono text-xs">{cert.serialNumber}</p>
              </div>
              <StatusBadge status={cert.status} />
              <p className="text-muted-foreground shrink-0 text-xs">
                {cert.createdAt.toLocaleDateString('it-IT')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
