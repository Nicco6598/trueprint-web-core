import { CreateCertificateDialog } from '@/components/certificates/CreateCertificateDialog'
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
import { mockCertificates } from '@/lib/mock-data'

export default function CertificatesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Certificati</h1>
          <p className="text-muted-foreground text-sm">
            Gestisci i certificati di autenticità dei tuoi prodotti.
          </p>
        </div>
        <CreateCertificateDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tutti i certificati</CardTitle>
          <CardDescription>{mockCertificates.length} certificati totali</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prodotto</TableHead>
                <TableHead>Numero seriale</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Creato il</TableHead>
                <TableHead>Aggiornato il</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCertificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-medium">{cert.productName}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {cert.serialNumber}
                  </TableCell>
                  <TableCell>{cert.brand.name}</TableCell>
                  <TableCell>
                    <StatusBadge status={cert.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {cert.createdAt.toLocaleDateString('it-IT')}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {cert.updatedAt.toLocaleDateString('it-IT')}
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
