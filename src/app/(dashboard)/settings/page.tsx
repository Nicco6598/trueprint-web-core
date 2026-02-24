import { ShieldCheck, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { mockBrands } from '@/lib/mock-data'

// In produzione questi dati vengono dalla sessione Auth.js e dal DB
const mockUser = {
  name: 'Marco Rossi',
  email: 'marco@novabrand.it',
  image: null as string | null,
  role: 'brand' as const,
}

export default function SettingsPage() {
  const initials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const brand = mockBrands[0]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground text-sm">
          Gestisci il tuo profilo e le informazioni del brand.
        </p>
      </div>

      {/* Profilo utente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profilo
          </CardTitle>
          <CardDescription>Le tue informazioni account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mockUser.image ?? undefined} alt={mockUser.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{mockUser.name}</p>
              <p className="text-muted-foreground text-sm">{mockUser.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground font-medium">Ruolo</p>
              <Badge variant="secondary" className="mt-1 capitalize">
                {mockUser.role}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground font-medium">Autenticazione</p>
              <p className="mt-1 font-medium">GitHub OAuth</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand */}
      {brand && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Brand
            </CardTitle>
            <CardDescription>Informazioni sul tuo brand certificato.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground font-medium">Nome</p>
                <p className="mt-1 font-semibold">{brand.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Slug</p>
                <p className="mt-1 font-mono">{brand.slug}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">ID Brand</p>
                <p className="text-muted-foreground mt-1 font-mono text-xs">{brand.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground font-medium">Membro dal</p>
                <p className="mt-1">{brand.createdAt.toLocaleDateString('it-IT')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* API info */}
      <Card>
        <CardHeader>
          <CardTitle>Endpoint API iOS</CardTitle>
          <CardDescription>
            Usa questo endpoint per verificare i certificati dall&apos;app iOS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-md p-3">
            <p className="font-mono text-xs">GET /api/v1/certificates/[id]/verify</p>
          </div>
          <p className="text-muted-foreground mt-2 text-xs">
            Restituisce <code className="bg-muted rounded px-1 py-0.5">status</code> e{' '}
            <code className="bg-muted rounded px-1 py-0.5">data</code> per ogni certificato attivo.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
