'use client'

import { useState } from 'react'
import { Link2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { StatusBadge } from './StatusBadge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { MockCertificate } from '@/lib/mock-data'

type Filter = 'all' | 'active' | 'draft' | 'revoked'

const filterLabels: Record<Filter, string> = {
  all: 'Tutti',
  active: 'Attivi',
  draft: 'Bozze',
  revoked: 'Revocati',
}

export function CertificatesTable({ certificates }: { certificates: MockCertificate[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const counts: Record<Filter, number> = {
    all: certificates.length,
    active: certificates.filter((c) => c.status === 'active').length,
    draft: certificates.filter((c) => c.status === 'draft').length,
    revoked: certificates.filter((c) => c.status === 'revoked').length,
  }

  const filtered = filter === 'all' ? certificates : certificates.filter((c) => c.status === filter)

  function copyVerifyLink(id: string) {
    const url = `${window.location.origin}/api/v1/certificates/${id}/verify`
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copiato negli appunti')
    })
  }

  return (
    <div className="bg-card border">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-0.5">
          {(Object.keys(filterLabels) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 text-xs transition-colors',
                filter === f
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {filterLabels[f]}
              <span className={cn('ml-1.5 font-mono', filter === f ? 'opacity-60' : 'opacity-40')}>
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
        <p className="text-muted-foreground text-xs">{filtered.length} risultati</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prodotto</TableHead>
            <TableHead>Seriale</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead>Creato</TableHead>
            <TableHead>Aggiornato</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell className="text-sm font-medium">{cert.productName}</TableCell>
              <TableCell className="text-muted-foreground font-mono text-xs">
                {cert.serialNumber}
              </TableCell>
              <TableCell className="text-sm">{cert.brand.name}</TableCell>
              <TableCell>
                <StatusBadge status={cert.status} />
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {cert.createdAt.toLocaleDateString('it-IT')}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {cert.updatedAt.toLocaleDateString('it-IT')}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => copyVerifyLink(cert.id)}
                  className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                  title="Copia link verifica"
                >
                  <Link2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground py-10 text-center text-sm">
                Nessun certificato
                {filter !== 'all' ? ` con stato "${filterLabels[filter]}"` : ''}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
