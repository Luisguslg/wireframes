import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardContent } from "@/components/dashboard-content"

export default function PerfilPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DashboardContent />
      </main>
      <Footer />
    </div>
  )
}
