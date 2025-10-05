import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SearchResults />
      </main>
      <Footer />
    </div>
  )
}
