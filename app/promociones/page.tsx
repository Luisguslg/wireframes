import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PromotionsHero } from "@/components/promotions-hero"
import { PromotionsGrid } from "@/components/promotions-grid"

export default function PromotionsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PromotionsHero />
        <PromotionsGrid />
      </main>
      <Footer />
    </div>
  )
}
