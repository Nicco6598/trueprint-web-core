import { CreateCertificateDialog } from '@/components/certificates/CreateCertificateDialog'
import { CertificatesTable } from '@/components/certificates/CertificatesTable'
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

      <CertificatesTable certificates={mockCertificates} />
    </div>
  )
}
