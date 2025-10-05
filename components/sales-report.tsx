"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, DollarSign, Receipt, CreditCard, TrendingUp } from "lucide-react"
import Link from "next/link"

export function SalesReport() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [currency, setCurrency] = useState("all")
  const [paymentMethod, setPaymentMethod] = useState("all")

  const mockData = [
    {
      id: "INV-202502-0001",
      client: "Juan Pérez",
      total: 1299.0,
      currency: "USD",
      methods: ["Tarjeta", "Zelle"],
      date: "2025-02-10",
    },
    {
      id: "INV-202502-0002",
      client: "María González",
      total: 850.5,
      currency: "USD",
      methods: ["PayPal"],
      date: "2025-02-09",
    },
    {
      id: "INV-202502-0003",
      client: "Carlos Rodríguez",
      total: 2150.0,
      currency: "USD",
      methods: ["Transferencia", "USDT"],
      date: "2025-02-08",
    },
    {
      id: "INV-202502-0004",
      client: "Ana Martínez",
      total: 675.25,
      currency: "EUR",
      methods: ["Tarjeta"],
      date: "2025-02-07",
    },
    {
      id: "INV-202502-0005",
      client: "Luis Fernández",
      total: 45000.0,
      currency: "VES",
      methods: ["Pago Móvil", "Efectivo"],
      date: "2025-02-06",
    },
  ]

  const calculateTotalSales = () => {
    return mockData.reduce((sum, item) => sum + item.total, 0).toFixed(2)
  }

  const calculateAverageTicket = () => {
    return (mockData.reduce((sum, item) => sum + item.total, 0) / mockData.length).toFixed(2)
  }

  const calculateCombinedPayments = () => {
    const combined = mockData.filter((item) => item.methods.length > 1).length
    return ((combined / mockData.length) * 100).toFixed(0)
  }

  const exportToCSV = () => {
    const headers = ["ID Factura", "Cliente", "Total", "Moneda", "Métodos de Pago", "Fecha"]
    const rows = mockData.map((item) => [
      item.id,
      item.client,
      item.total,
      item.currency,
      item.methods.join(" + "),
      item.date,
    ])

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte-ventas-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reporte de Ventas</h1>
          <p className="text-muted-foreground">Análisis financiero y facturación</p>
        </div>
        <Link href="/reportes">
          <Button variant="outline">Volver a Reportes</Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">Desde</Label>
              <Input id="date-from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">Hasta</Label>
              <Input id="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="VES">VES</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Método de Pago</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="zelle">Zelle</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                  <SelectItem value="usdt">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendido</p>
                <p className="text-3xl font-bold text-[#2196F3]">${calculateTotalSales()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-[#2196F3]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Promedio</p>
                <p className="text-3xl font-bold text-green-600">${calculateAverageTicket()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Facturas</p>
                <p className="text-3xl font-bold text-purple-600">{mockData.length}</p>
              </div>
              <Receipt className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pagos Combinados</p>
                <p className="text-3xl font-bold text-amber-600">{calculateCombinedPayments()}%</p>
              </div>
              <CreditCard className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detalle de Facturas</CardTitle>
              <CardDescription>Listado completo de ventas realizadas</CardDescription>
            </div>
            <Button onClick={exportToCSV} className="bg-[#2196F3] hover:bg-[#2196F3]/90">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Factura</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Moneda</TableHead>
                  <TableHead>Métodos de Pago</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono font-medium">{item.id}</TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell className="text-right font-semibold">{item.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.currency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {item.methods.map((method) => (
                          <Badge key={method} className="bg-[#2196F3]/10 text-[#2196F3] hover:bg-[#2196F3]/20">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
