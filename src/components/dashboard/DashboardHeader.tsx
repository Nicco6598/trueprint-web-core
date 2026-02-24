import { auth, signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export async function DashboardHeader() {
  const session = process.env.NODE_ENV !== 'development' ? await auth() : null
  const user = session?.user

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'MR'

  return (
    <header className="bg-background flex h-12 shrink-0 items-center justify-between border-b px-6">
      {/* Breadcrumb placeholder — può diventare dinamico */}
      <p className="text-muted-foreground text-xs tracking-[0.1em] uppercase">
        {user?.role ? `${user.role}` : 'Brand'}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-6 w-6 rounded-sm">
            <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? 'User'} />
            <AvatarFallback className="rounded-sm text-[10px]">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user?.name ?? 'Marco Rossi'}</span>
        </div>

        <div className="bg-border h-4 w-px" />

        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/login' })
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            type="submit"
            className="text-muted-foreground hover:text-foreground h-auto rounded-sm px-2 py-1 text-xs"
          >
            Esci
          </Button>
        </form>
      </div>
    </header>
  )
}
