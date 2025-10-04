import { SalesReport } from "@/components/sales-report"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function ReportesVentasPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Analitica comercial</p>
            <h1 className="text-3xl font-bold md:text-4xl">Reporte de ventas</h1>
            <p className="text-muted-foreground md:text-lg">
              Desglosa ingresos, facturacion y oportunidades para sostener el crecimiento de la agencia.
            </p>
          </div>
          <SalesReport />
        </div>
      </main>
      <Footer />
    </div>
  )
}
