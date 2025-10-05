import { Header } from "@/components/header"
import { ServiceDetails } from "@/components/service-details"
import { Footer } from "@/components/footer"

export default function ServicePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <ServiceDetails />
      <Footer />
    </div>
  )
}
