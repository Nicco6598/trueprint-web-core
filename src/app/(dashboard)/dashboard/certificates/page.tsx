import { CreateCertificateDialog } from '@/components/certificates/CreateCertificateDialog'
import { StatusBadge } from '@/components/certificates/StatusBadge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockCertificates } from '@/lib/mock-data'

export default function CertificatesPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-start justify-between border-b pb-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Certificati</h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Gestisci i certificati di autenticità dei tuoi prodotti.
          </p>
        </div>
        <CreateCertificateDialog />
      </div>

      {/* Table */}
      <div className="bg-card border">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-medium">Tutti i certificati</p>
          <p className="text-muted-foreground text-xs">{mockCertificates.length} totali</p>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCertificates.map((cert) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
