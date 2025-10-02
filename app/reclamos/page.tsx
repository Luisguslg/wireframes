import { ClaimsSurveys } from "@/components/claims-surveys"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ReclaimPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Reclamos y Encuestas</h1>
            <p className="text-white/90 text-lg">Centro de atención al cliente</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <ClaimsSurveys />
        </div>
      </main>
      <Footer />
    </div>
  )
}
