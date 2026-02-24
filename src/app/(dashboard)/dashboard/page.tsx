import { FileCheck, FileText, ShieldCheck, ShieldOff } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/certificates/StatusBadge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMockStats, mockCertificates } from '@/lib/mock-data'

const statCards = [
  { title: 'Totale', key: 'total' as const, icon: FileCheck },
  { title: 'Attivi', key: 'active' as const, icon: ShieldCheck },
  { title: 'In bozza', key: 'draft' as const, icon: FileText },
  { title: 'Revocati', key: 'revoked' as const, icon: ShieldOff },
]

export default function DashboardPage() {
  const stats = getMockStats()
  const recent = mockCertificates.slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="border-b pb-4">
        <h1 className="text-lg font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-0.5 text-xs">
          Panoramica delle certificazioni del tuo brand.
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map(({ title, key, icon: Icon }) => (
          <div key={key} className="bg-card border p-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-[10px] font-medium tracking-[0.12em] uppercase">
                {title}
              </p>
              <Icon className="text-muted-foreground/50 h-3.5 w-3.5" strokeWidth={1.5} />
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight">{stats[key]}</p>
          </div>
        ))}
      </div>

      {/* Recent certificates */}
      <div className="bg-card border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="text-sm font-medium">Certificati recenti</p>
            <p className="text-muted-foreground mt-0.5 text-xs">Ultimi 5 emessi</p>
          </div>
          <Link
            href="/dashboard/certificates"
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            Vedi tutti →
          </Link>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prodotto</TableHead>
              <TableHead>Seriale</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead className="text-right">Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="text-sm font-medium">{cert.productName}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs">
                  {cert.serialNumber}
                </TableCell>
                <TableCell className="text-sm">{cert.brand.name}</TableCell>
                <TableCell>
                  <StatusBadge status={cert.status} />
                </TableCell>
                <TableCell className="text-muted-foreground text-right text-xs">
                  {cert.createdAt.toLocaleDateString('it-IT')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
