import { cn } from '@/lib/utils'

type Status = 'draft' | 'active' | 'revoked'

const config: Record<Status, { label: string; className: string }> = {
  active: {
    label: 'Attivo',
    className: 'text-foreground',
  },
  draft: {
    label: 'Bozza',
    className: 'text-muted-foreground',
  },
  revoked: {
    label: 'Revocato',
    className: 'text-muted-foreground line-through',
  },
}

export function StatusBadge({ status }: { status: Status }) {
  const { label, className } = config[status]
  return (
    <span className={cn('text-[10px] font-medium tracking-[0.1em] uppercase', className)}>
      {label}
    </span>
  )
}
