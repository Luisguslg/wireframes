import { InvoiceGenerator } from "@/components/invoice-generator"

export default function FacturaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Generador de Facturas</h1>
          <p className="text-muted-foreground">Crea y gestiona facturas para tus servicios de viaje</p>
        </div>
        <InvoiceGenerator />
      </div>
    </div>
  )
}
