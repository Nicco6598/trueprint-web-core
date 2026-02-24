import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const QR_GRID = [
  [1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1],
  [1, 1, 1, 0, 0, 1],
]

export default function LoginPage() {
  return (
    <div className="bg-background flex min-h-screen">
      {/* ── Left panel ── */}
      <div className="bg-foreground text-background relative hidden overflow-hidden lg:flex lg:w-[56%] lg:flex-col lg:justify-between lg:p-14">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(1 0 0) 1px, transparent 1px),
              linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)
            `,
            backgroundSize: '56px 56px',
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-base font-semibold tracking-tight">Trueprint</span>
        </div>

        {/* Content */}
        <div className="relative space-y-12">
          <div className="space-y-4">
            <h1 className="text-[3.75rem] leading-[1.0] font-bold tracking-[-0.03em]">
              Ogni prodotto.
              <br />
              <span className="text-background/35">Una identità.</span>
            </h1>
            <p className="text-background/45 max-w-xs text-sm leading-relaxed">
              Emetti certificati digitali verificabili via QR code o NFC. Proteggi il tuo brand
              dalla contraffazione.
            </p>
          </div>

          {/* Certificate mock — sharp, rectangular */}
          <div className="border-background/12 bg-background/[0.05] max-w-[20rem] border p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-background/35 text-[10px] font-medium tracking-[0.15em] uppercase">
                  Certificato di autenticità
                </p>
                <p className="mt-3 text-base leading-snug font-semibold">Air Max 2024</p>
                <p className="text-background/45 mt-0.5 text-sm">NovaBrand</p>
              </div>
              {/* QR decorativo */}
              <div
                className="grid shrink-0 gap-[2px] opacity-25"
                style={{
                  gridTemplateColumns: 'repeat(6, 9px)',
                  gridTemplateRows: 'repeat(6, 9px)',
                }}
              >
                {QR_GRID.flat().map((cell, i) => (
                  <div key={i} className={cell ? 'bg-background' : 'bg-transparent'} />
                ))}
              </div>
            </div>

            <div className="bg-background/10 h-px" />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-background/30 font-mono text-[11px]">SN-2024-001</span>
              <span className="text-background/30 text-[10px] font-medium tracking-[0.12em] uppercase">
                Attivo
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-background/20 relative text-xs">
          © {new Date().getFullYear()} Trueprint. All rights reserved.
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="bg-muted/20 flex flex-1 flex-col items-center justify-center px-8">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2 lg:hidden">
          <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
          <span className="text-base font-semibold">Trueprint</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-card space-y-7 border p-8 shadow-xs">
            <div className="space-y-1.5">
              <h2 className="text-lg font-semibold tracking-tight">Accedi</h2>
              <p className="text-muted-foreground text-sm">
                Accedi con il tuo account GitHub per continuare.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild size="lg" className="w-full rounded-sm">
                <Link href="/dashboard">
                  <svg
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Continua con GitHub
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-muted-foreground text-xs">oppure</span>
                <Separator className="flex-1" />
              </div>

              <Button variant="outline" size="lg" className="w-full rounded-sm" disabled>
                Accedi con email
                <span className="text-muted-foreground/50 ml-1.5 text-[11px] font-normal">
                  — prossimamente
                </span>
              </Button>
            </div>

            <p className="text-muted-foreground/70 text-center text-xs">
              Accedendo accetti i{' '}
              <span className="hover:text-foreground cursor-pointer underline underline-offset-4 transition-colors">
                Termini di servizio
              </span>{' '}
              e la{' '}
              <span className="hover:text-foreground cursor-pointer underline underline-offset-4 transition-colors">
                Privacy policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
