import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PackagesHero } from "@/components/packages-hero"
import { PackagesGrid } from "@/components/packages-grid"
import { FeaturedPackages } from "@/components/featured-packages"

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <PackagesHero />
        <FeaturedPackages />
        <PackagesGrid />
      </main>
      <Footer />
    </div>
  )
}
