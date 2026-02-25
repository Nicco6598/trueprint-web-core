'use client'

import { useState } from 'react'
import { Link2, Search, X } from 'lucide-react'
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
  const [search, setSearch] = useState('')

  const counts: Record<Filter, number> = {
    all: certificates.length,
    active: certificates.filter((c) => c.status === 'active').length,
    draft: certificates.filter((c) => c.status === 'draft').length,
    revoked: certificates.filter((c) => c.status === 'revoked').length,
  }

  const filtered = certificates
    .filter((c) => filter === 'all' || c.status === filter)
    .filter((c) => {
      if (!search) return true
      const q = search.toLowerCase()
      return c.productName.toLowerCase().includes(q) || c.serialNumber.toLowerCase().includes(q)
    })

  function copyVerifyLink(id: string) {
    const url = `${window.location.origin}/api/v1/certificates/${id}/verify`
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copiato negli appunti')
    })
  }

  return (
    <div className="bg-card border">
      {/* Toolbar */}
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

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-3 w-3 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cerca prodotto o seriale..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 border bg-transparent py-1 pr-7 pl-7 text-xs focus:ring-1 focus:ring-sky-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <p className="text-muted-foreground text-xs whitespace-nowrap">
            {filtered.length} risultati
          </p>
        </div>
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
                {search
                  ? `Nessun risultato per "${search}"`
                  : `Nessun certificato${filter !== 'all' ? ` con stato "${filterLabels[filter]}"` : ''}`}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
