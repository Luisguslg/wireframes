"use client"

import { useMemo } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, BarChart3, DollarSign, FileText } from "lucide-react"

const revenueHighlights = [
  {
    id: "monthly",
    label: "Ingresos mes actual",
    value: 482000,
    helper: "+12% vs 2024",
    icon: DollarSign,
  },
  {
    id: "ticket",
    label: "Ticket promedio",
    value: 612,
    helper: "+8% vs objetivo",
    icon: BarChart3,
  },
  {
    id: "conversion",
    label: "Conversion checkout",
    value: 3.7,
    helper: "+0.4 pts vs ultimo mes",
    icon: ArrowUpRight,
  },
  {
    id: "pending",
    label: "Facturas pendientes",
    value: 23,
    helper: "USD 54K en seguimiento",
    icon: FileText,
  },
]

const channelBreakdown = [
  { channel: "Web", revenue: 226000, growth: "+15%" },
  { channel: "Operadores B2B", revenue: 128000, growth: "+7%" },
  { channel: "Marketplace", revenue: 76000, growth: "-4%" },
  { channel: "Oficinas fisicas", revenue: 52000, growth: "+3%" },
]

const paymentMix = [
  { method: "Tarjeta de credito", share: 58, trend: "+4" },
  { method: "Transferencia bancaria", share: 21, trend: "+1" },
  { method: "Pago movil", share: 12, trend: "=", },
  { method: "Cripto / stablecoin", share: 9, trend: "-2" },
]

const invoiceAlerts = [
  {
    id: "INV-1041",
    client: "Grupo Andino",
    amount: 12800,
    status: "Pendiente",
    due: "7 dias",
    risk: "alto",
  },
  {
    id: "INV-1034",
    client: "Eventos Latam",
    amount: 7600,
    status: "Vencido",
    due: "3 dias",
    risk: "critico",
  },
  {
    id: "INV-1030",
    client: "Agencia Caribe",
    amount: 9100,
    status: "Pendiente",
    due: "12 dias",
    risk: "medio",
  },
]

const bestSellers = [
  { name: "Paquete Premium Cancun", revenue: 56000, margin: "32%" },
  { name: "Tour Patagonia Invierno", revenue: 43800, margin: "28%" },
  { name: "Crucero Mediterraneo", revenue: 40200, margin: "24%" },
]

export function SalesReport() {
  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("es-VE", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
    [],
  )

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Resultados financieros</CardTitle>
            <CardDescription>Seguimiento de ventas y facturacion consolidada</CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Descargar reporte mensual
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {revenueHighlights.map((item) => {
            const Icon = item.icon
            const displayValue =
              item.id === "conversion"
                ? `${item.value}%`
                : item.id === "pending"
                  ? item.value.toString()
                  : currencyFormatter.format(item.value)

            return (
              <div key={item.id} className="rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-2 text-3xl font-semibold">{displayValue}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.helper}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ventas por canal</CardTitle>
          <CardDescription>Comparativo de ingresos netos por origen de la reserva</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Canal</TableHead>
                <TableHead>Ingresos</TableHead>
                <TableHead>Tendencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channelBreakdown.map((row) => (
                <TableRow key={row.channel}>
                  <TableCell className="font-medium">{row.channel}</TableCell>
                  <TableCell>{currencyFormatter.format(row.revenue)}</TableCell>
                  <TableCell>
                    <Badge variant={row.growth.startsWith("-") ? "destructive" : "secondary"}>
                      {row.growth}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Metodo de pago</CardTitle>
            <CardDescription>Distribucion total del periodo en curso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMix.map((item) => (
              <div key={item.method} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.method}</p>
                    <p className="text-xs text-muted-foreground">Participacion {item.share}%</p>
                  </div>
                  <Badge variant={item.trend.startsWith("-") ? "destructive" : "secondary"}>
                    {item.trend}
                  </Badge>
                </div>
                <Progress value={item.share} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top productos vendidos</CardTitle>
            <CardDescription>Ingresos y margen estimado por paquete destacado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {bestSellers.map((item) => (
              <div key={item.name} className="rounded-lg border bg-muted/30 p-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {currencyFormatter.format(item.revenue)} - Margen {item.margin}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas de facturacion</CardTitle>
          <CardDescription>Facturas pendientes priorizadas por riesgo e impacto</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceAlerts.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{currencyFormatter.format(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.risk === "critico"
                          ? "destructive"
                          : invoice.risk === "alto"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.due}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Proximos pasos recomendados</CardTitle>
          <CardDescription>Acciones sugeridas para mantener el ritmo de crecimiento</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Campanas flash</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Lanzar promociones 48h en marketplace para recuperar la caida de -4% mensual.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Programas corporativos</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Negociar tarifa anual con operadores B2B para mantener crecimiento de +7%.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Optimizacion checkout</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Crear pruebas A/B sobre complementos para elevar conversion a 4.2%.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
