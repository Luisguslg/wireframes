"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

interface ExchangeRate {
  id: string
  currency: string
  rate: number
  previousRate: number
  source: string
  updatedAt: string
  updatedBy: string
  notes: string
  active: boolean
}

export function ExchangeRateManagement() {
  const [view, setView] = useState<"overview" | "update">("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const currentRates = [
    { currency: "USD", symbol: "$", rate: 36.5, change: 0.15, active: true },
    { currency: "EUR", symbol: "€", rate: 39.8, change: 0.25, active: true },
    { currency: "USDT", symbol: "₮", rate: 36.45, change: -0.05, active: true },
    { currency: "COP", symbol: "$", rate: 0.0092, change: 0.0001, active: true },
    { currency: "ARS", symbol: "$", rate: 0.038, change: -0.002, active: true },
  ]

  const history: ExchangeRate[] = [
    {
      id: "1",
      currency: "USD",
      rate: 36.5,
      previousRate: 36.35,
      source: "BCV",
      updatedAt: "2025-02-10 14:30:25",
      updatedBy: "admin@viajesucab.com",
      notes: "Actualización diaria",
      active: true,
    },
    {
      id: "2",
      currency: "EUR",
      rate: 39.8,
      previousRate: 39.55,
      source: "BCV",
      updatedAt: "2025-02-10 09:00:15",
      updatedBy: "admin@viajesucab.com",
      notes: "Actualización diaria",
      active: true,
    },
    {
      id: "3",
      currency: "USDT",
      rate: 36.45,
      previousRate: 36.5,
      source: "Binance P2P",
      updatedAt: "2025-02-09 16:45:00",
      updatedBy: "admin@viajesucab.com",
      notes: "Promedio mercado P2P",
      active: true,
    },
  ]

  const filteredHistory = history.filter((entry) => entry.currency.toLowerCase().includes(searchTerm.toLowerCase()))

  if (view === "update") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-[#E91E63]" />
                Actualizar Tasas de Cambio
              </CardTitle>
              <CardDescription>Mantener las cotizaciones actualizadas para cálculos precisos</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setView("overview")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold">Importante: Auditoría Automática</p>
                <p>
                  Todas las actualizaciones de tasas quedan registradas con fecha, hora, usuario e IP para trazabilidad
                  completa.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda *</Label>
                <Select defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - Dólar Estadounidense</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="USDT">USDT - Tether</SelectItem>
                    <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                    <SelectItem value="ARS">ARS - Peso Argentino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Tasa vs Bs. *</Label>
                <Input id="rate" type="number" step="0.01" placeholder="36.50" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="source">Fuente *</Label>
                <Select defaultValue="BCV">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BCV">BCV (Banco Central de Venezuela)</SelectItem>
                    <SelectItem value="Binance">Binance P2P</SelectItem>
                    <SelectItem value="LocalBitcoins">LocalBitcoins</SelectItem>
                    <SelectItem value="Manual">Entrada Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cutoffTime">Fecha/Hora de Corte *</Label>
                <Input id="cutoffTime" type="datetime-local" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observaciones</Label>
              <Textarea id="notes" placeholder="Notas adicionales sobre esta actualización..." rows={3} />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar Tasa
              </Button>
              <Button type="button" variant="outline" onClick={() => setView("overview")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Rates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#E91E63]" />
                Tasas Activas del Día
              </CardTitle>
              <CardDescription>Cotizaciones actuales para cálculos de reservas</CardDescription>
            </div>
            <Button onClick={() => setView("update")} className="bg-[#E91E63] hover:bg-[#C2185B]">
              <Plus className="h-4 w-4 mr-2" />
              Actualizar Tasa
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {currentRates.map((rate) => (
              <Card key={rate.currency}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    <span>
                      {rate.currency} {rate.symbol} → VES
                    </span>
                    <Badge variant="outline" className="text-xs">
                      Activa
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Bs. {rate.rate.toFixed(2)}</div>
                  <p
                    className={`text-xs mt-1 flex items-center gap-1 ${rate.change >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {rate.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {rate.change >= 0 ? "+" : ""}
                    {rate.change.toFixed(2)} hoy
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rate History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-[#E91E63]" />
            Historial de Actualizaciones
          </CardTitle>
          <CardDescription>Registro completo para auditoría y trazabilidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por moneda..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Moneda</TableHead>
                    <TableHead>Tasa</TableHead>
                    <TableHead>Cambio</TableHead>
                    <TableHead>Fuente</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Usuario</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No se encontraron registros
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredHistory.map((entry) => {
                      const change = entry.rate - entry.previousRate
                      return (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.currency}</TableCell>
                          <TableCell className="font-bold">Bs. {entry.rate.toFixed(2)}</TableCell>
                          <TableCell>
                            <span
                              className={`flex items-center gap-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                              {change >= 0 ? "+" : ""}
                              {change.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{entry.source}</Badge>
                          </TableCell>
                          <TableCell className="text-sm">{entry.updatedAt}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{entry.updatedBy}</TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Mostrando {filteredHistory.length} registros</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
