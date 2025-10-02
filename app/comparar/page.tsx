import { OfferComparator } from "@/components/offer-comparator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ComparePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <OfferComparator />
      <Footer />
    </div>
  )
}
