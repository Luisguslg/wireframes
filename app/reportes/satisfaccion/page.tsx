import { SatisfactionReport } from "@/components/satisfaction-report"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function ReportesSatisfaccionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Analitica de clientes</p>
            <h1 className="text-3xl font-bold md:text-4xl">Reporte de satisfaccion</h1>
            <p className="text-muted-foreground md:text-lg">
              Visualiza tendencias, comentarios y segmentos clave para mejorar la experiencia de los viajeros.
            </p>
          </div>
          <SatisfactionReport />
        </div>
      </main>
      <Footer />
    </div>
  )
}
