import { cn } from '@/lib/utils'

type Status = 'draft' | 'active' | 'revoked'

const config: Record<Status, { label: string; className: string }> = {
  active: {
    label: 'Attivo',
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400',
  },
  draft: {
    label: 'Bozza',
    className:
      'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-400',
  },
  revoked: {
    label: 'Revocato',
    className:
      'border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/60 dark:text-red-400',
  },
}

export function StatusBadge({ status }: { status: Status }) {
  const { label, className } = config[status]
  return (
    <span
      className={cn(
        'inline-block border px-1.5 py-0.5 text-[10px] font-medium tracking-[0.08em] uppercase',
        className
      )}
    >
      {label}
    </span>
  )
}
