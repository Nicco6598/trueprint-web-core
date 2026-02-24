import { FileCheck, FileText, ShieldCheck, ShieldOff } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/certificates/StatusBadge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  { title: 'Totale certificati', key: 'total' as const, icon: FileCheck, color: 'text-foreground' },
  { title: 'Attivi', key: 'active' as const, icon: ShieldCheck, color: 'text-green-600' },
  { title: 'In bozza', key: 'draft' as const, icon: FileText, color: 'text-amber-500' },
  { title: 'Revocati', key: 'revoked' as const, icon: ShieldOff, color: 'text-destructive' },
]

export default function DashboardPage() {
  const stats = getMockStats()
  const recent = mockCertificates.slice(0, 5)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Panoramica delle certificazioni del tuo brand.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map(({ title, key, icon: Icon, color }) => (
          <Card key={key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{title}</CardTitle>
              <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats[key]}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent certificates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Certificati recenti</CardTitle>
              <CardDescription>Gli ultimi 5 certificati emessi.</CardDescription>
            </div>
            <Link
              href="/dashboard/certificates"
              className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
            >
              Vedi tutti →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prodotto</TableHead>
                <TableHead>Numero seriale</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.productName}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {cert.serialNumber}
                  </TableCell>
                  <TableCell>{cert.brand.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={cert.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-sm">
                    {cert.createdAt.toLocaleDateString('it-IT')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
