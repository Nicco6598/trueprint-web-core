import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== 'development') {
    const session = await auth()
    if (!session?.user) redirect('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="bg-muted/20 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
