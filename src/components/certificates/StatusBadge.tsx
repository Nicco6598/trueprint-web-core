import { cn } from '@/lib/utils'

type Status = 'draft' | 'active' | 'revoked'

const config: Record<Status, { label: string; className: string }> = {
  active: {
    label: 'Attivo',
    className:
      'border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300',
  },
  draft: {
    label: 'Bozza',
    className:
      'border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-700 dark:bg-amber-900/60 dark:text-amber-300',
  },
  revoked: {
    label: 'Revocato',
    className:
      'border-rose-300 bg-rose-100 text-rose-700 dark:border-rose-800 dark:bg-rose-950/60 dark:text-rose-400',
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
