import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <div className="bg-muted/40 flex min-h-screen items-center justify-center">
      <div className="bg-card w-full max-w-sm rounded-xl border p-8 shadow-sm">
        <div className="mb-8 space-y-1.5 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Trueprint</h1>
          <p className="text-muted-foreground text-sm">Accedi per gestire le certificazioni</p>
        </div>

        <Button asChild className="w-full">
          <Link href="/dashboard">Accedi con GitHub</Link>
        </Button>
      </div>
    </div>
  )
}
