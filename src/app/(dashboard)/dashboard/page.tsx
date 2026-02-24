export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Trueprint brand dashboard.</p>
      </div>

      <div className="bg-card text-muted-foreground rounded-lg border p-8 text-center">
        <p className="text-sm">Your certificates and analytics will appear here.</p>
      </div>
    </div>
  )
}
