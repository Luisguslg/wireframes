import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Centro de Reportes</h1>
          <p className="text-muted-foreground">Accede a reportes detallados de satisfacción y ventas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Satisfaction Report Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Reporte de Satisfacción
              </CardTitle>
              <CardDescription className="text-white/90">Análisis de encuestas y feedback de clientes</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Incluye:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>NPS promedio y tendencias</li>
                  <li>Calificaciones por servicio y operador</li>
                  <li>Análisis de comentarios</li>
                  <li>Porcentaje de reseñas públicas</li>
                </ul>
              </div>
              <Link href="/reportes/satisfaccion">
                <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Reporte
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sales Report Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Reporte de Ventas
              </CardTitle>
              <CardDescription className="text-white/90">Análisis financiero y facturación</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Incluye:</p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Total vendido por período</li>
                  <li>Ticket promedio y tendencias</li>
                  <li>Análisis por método de pago</li>
                  <li>Desglose por moneda</li>
                </ul>
              </div>
              <Link href="/reportes/ventas">
                <Button className="w-full bg-[#2196F3] hover:bg-[#2196F3]/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Reporte
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
