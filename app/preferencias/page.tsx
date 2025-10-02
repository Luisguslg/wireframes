import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PreferencesSettings } from "@/components/preferences-settings"

export default function PreferencesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <PreferencesSettings />
      </main>
      <Footer />
    </div>
  )
}
