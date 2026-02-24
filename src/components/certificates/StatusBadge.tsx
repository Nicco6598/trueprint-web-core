import { Badge } from '@/components/ui/badge'

type Status = 'draft' | 'active' | 'revoked'

const config: Record<Status, { label: string; variant: 'default' | 'secondary' | 'destructive' }> =
  {
    active: { label: 'Attivo', variant: 'default' },
    draft: { label: 'Bozza', variant: 'secondary' },
    revoked: { label: 'Revocato', variant: 'destructive' },
  }

export function StatusBadge({ status }: { status: Status }) {
  const { label, variant } = config[status]
  return <Badge variant={variant}>{label}</Badge>
}
