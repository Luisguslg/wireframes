import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ConfirmationContent } from "@/components/confirmation-content"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ConfirmationContent />
      </main>
      <Footer />
    </div>
  )
}
