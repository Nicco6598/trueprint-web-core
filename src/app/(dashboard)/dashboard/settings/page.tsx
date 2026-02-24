import { mockBrands } from '@/lib/mock-data'

// In produzione: dati dalla sessione Auth.js e dal DB
const mockUser = {
  name: 'Marco Rossi',
  email: 'marco@novabrand.it',
  role: 'brand' as const,
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-card border">
      <div className="border-b px-4 py-3">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>}
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  )
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-2">
      <p className="text-muted-foreground text-[10px] font-medium tracking-[0.1em] uppercase">
        {label}
      </p>
      <p className={`text-sm ${mono ? 'font-mono' : 'font-medium'}`}>{value}</p>
    </div>
  )
}

export default function SettingsPage() {
  const brand = mockBrands[0]

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="border-b pb-4">
        <h1 className="text-lg font-semibold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground mt-0.5 text-xs">
          Gestisci il tuo profilo e le informazioni del brand.
        </p>
      </div>

      {/* Profilo */}
      <Section title="Profilo" description="Le tue informazioni account.">
        <div className="divide-y">
          <Row label="Nome" value={mockUser.name} />
          <Row label="Email" value={mockUser.email} mono />
          <Row label="Ruolo" value={mockUser.role} />
          <Row label="Autenticazione" value="GitHub OAuth" />
        </div>
      </Section>

      {/* Brand */}
      {brand && (
        <Section title="Brand" description="Informazioni sul tuo brand certificato.">
          <div className="divide-y">
            <Row label="Nome" value={brand.name} />
            <Row label="Slug" value={brand.slug} mono />
            <Row label="ID" value={brand.id} mono />
            <Row label="Membro dal" value={brand.createdAt.toLocaleDateString('it-IT')} />
          </div>
        </Section>
      )}

      {/* API */}
      <Section
        title="Endpoint API iOS"
        description="Usa questo endpoint per verificare i certificati dall'app iOS."
      >
        <div className="bg-muted/50 border p-3">
          <p className="font-mono text-xs">GET /api/v1/certificates/[id]/verify</p>
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Restituisce <code className="bg-muted px-1 py-0.5 font-mono">status</code> e{' '}
          <code className="bg-muted px-1 py-0.5 font-mono">data</code> per ogni certificato attivo.
        </p>
      </Section>
    </div>
  )
}
