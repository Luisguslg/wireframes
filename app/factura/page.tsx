import { EnhancedSurvey } from "@/components/enhanced-survey"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function FacturaSurveyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Satisfaccion y facturacion</p>
            <h1 className="text-3xl font-bold md:text-4xl">Encuesta de satisfaccion</h1>
            <p className="text-muted-foreground md:text-lg">
              Tu opinion nos ayuda a priorizar mejoras en los servicios posventa y en la entrega de facturas.
              Comparte tu experiencia para que podamos cerrar brechas en menos de 48 horas.
            </p>
          </div>
          <EnhancedSurvey />
        </div>
      </main>
      <Footer />
    </div>
  )
}
