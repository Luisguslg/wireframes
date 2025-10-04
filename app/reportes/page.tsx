import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { BarChart3, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ReportesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Inteligencia comercial</p>
            <h1 className="text-3xl font-bold md:text-4xl">Centro de reportes</h1>
            <p className="text-muted-foreground md:text-lg">
              Accede a reportes consolidados de satisfaccion, ventas y seguimiento de clientes para tomar decisiones con datos.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Reporte de satisfaccion
                </CardTitle>
                <CardDescription className="text-white/90">
                  Analiza comentarios, NPS y servicios mejor valorados por los clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Incluye:</p>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Tendencia NPS y CSAT por mes</li>
                    <li>Puntuacion por servicio y operador</li>
                    <li>Insights accionables por canal</li>
                    <li>Detalle de comentarios recientes</li>
                  </ul>
                </div>
                <Link href="/reportes/satisfaccion">
                  <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver reporte
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  Reporte de ventas
                </CardTitle>
                <CardDescription className="text-white/90">
                  Revisa ingresos, metas y alertas clave de facturacion por canal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Incluye:</p>
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    <li>Ingresos por canal y tendencia</li>
                    <li>Ticket promedio y conversion</li>
                    <li>Distribucion de metodos de pago</li>
                    <li>Alertas de facturacion pendientes</li>
                  </ul>
                </div>
                <Link href="/reportes/ventas">
                  <Button className="w-full bg-[#2196F3] hover:bg-[#2196F3]/90">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver reporte
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
