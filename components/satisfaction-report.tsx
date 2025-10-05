"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Filter, Star, TrendingUp, Users, MessageSquare } from "lucide-react"
import Link from "next/link"

export function SatisfactionReport() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [destination, setDestination] = useState("all")
  const [operator, setOperator] = useState("all")
  const [serviceType, setServiceType] = useState("all")

  const mockData = [
    {
      id: "BK-2025-001",
      destination: "Cancún, México",
      operator: "Royal Caribbean",
      nps: 9,
      ratings: { quality: 5, priceValue: 4, punctuality: 5, staff: 5, operator: 5, destination: 5 },
      date: "2025-02-08",
    },
    {
      id: "BK-2025-012",
      destination: "Punta Cana, RD",
      operator: "Hilton Hotels",
      nps: 8,
      ratings: { quality: 4, priceValue: 4, punctuality: 4, staff: 5, operator: 4, destination: 5 },
      date: "2025-02-07",
    },
    {
      id: "BK-2025-023",
      destination: "Miami, USA",
      operator: "Copa Airlines",
      nps: 7,
      ratings: { quality: 4, priceValue: 3, punctuality: 4, staff: 4, operator: 4, destination: 4 },
      date: "2025-02-06",
    },
    {
      id: "BK-2025-034",
      destination: "Buenos Aires, AR",
      operator: "Avianca",
      nps: 10,
      ratings: { quality: 5, priceValue: 5, punctuality: 5, staff: 5, operator: 5, destination: 5 },
      date: "2025-02-05",
    },
  ]

  const calculateAverageRating = () => {
    const total = mockData.reduce((sum, item) => {
      const avg = Object.values(item.ratings).reduce((a, b) => a + b, 0) / Object.values(item.ratings).length
      return sum + avg
    }, 0)
    return (total / mockData.length).toFixed(1)
  }

  const calculateNPS = () => {
    const promoters = mockData.filter((item) => item.nps >= 9).length
    const detractors = mockData.filter((item) => item.nps <= 6).length
    return (((promoters - detractors) / mockData.length) * 100).toFixed(0)
  }

  const exportToCSV = () => {
    const headers = ["Reserva", "Destino", "Operador", "NPS", "Rating Promedio", "Fecha"]
    const rows = mockData.map((item) => {
      const avgRating = (
        Object.values(item.ratings).reduce((a, b) => a + b, 0) / Object.values(item.ratings).length
      ).toFixed(1)
      return [item.id, item.destination, item.operator, item.nps, avgRating, item.date]
    })

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `reporte-satisfaccion-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reporte de Satisfacción</h1>
          <p className="text-muted-foreground">Análisis de encuestas y feedback de clientes</p>
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
          <div className="grid md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date-from">Desde</Label>
              <Input id="date-from" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-to">Hasta</Label>
              <Input id="date-to" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destino</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger id="destination">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="cancun">Cancún</SelectItem>
                  <SelectItem value="punta-cana">Punta Cana</SelectItem>
                  <SelectItem value="miami">Miami</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="operator">Operador</Label>
              <Select value={operator} onValueChange={setOperator}>
                <SelectTrigger id="operator">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="royal">Royal Caribbean</SelectItem>
                  <SelectItem value="hilton">Hilton Hotels</SelectItem>
                  <SelectItem value="copa">Copa Airlines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-type">Tipo de Servicio</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="service-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="aereo">Aéreo</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="crucero">Crucero</SelectItem>
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
                <p className="text-sm text-muted-foreground">NPS Promedio</p>
                <p className="text-3xl font-bold text-[#E91E63]">{calculateNPS()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#E91E63]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rating Global</p>
                <p className="text-3xl font-bold text-amber-500">{calculateAverageRating()}/5</p>
              </div>
              <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Reseñas Públicas</p>
                <p className="text-3xl font-bold text-blue-600">75%</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Respuestas</p>
                <p className="text-3xl font-bold text-green-600">{mockData.length}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Detalle de Encuestas</CardTitle>
              <CardDescription>Listado completo de respuestas recibidas</CardDescription>
            </div>
            <Button onClick={exportToCSV} className="bg-[#E91E63] hover:bg-[#E91E63]/90">
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
                  <TableHead>Reserva</TableHead>
                  <TableHead>Destino</TableHead>
                  <TableHead>Operador</TableHead>
                  <TableHead className="text-center">NPS</TableHead>
                  <TableHead className="text-center">Calidad</TableHead>
                  <TableHead className="text-center">Precio-Valor</TableHead>
                  <TableHead className="text-center">Puntualidad</TableHead>
                  <TableHead className="text-center">Personal</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.destination}</TableCell>
                    <TableCell>{item.operator}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                          item.nps >= 9
                            ? "bg-green-100 text-green-700"
                            : item.nps >= 7
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.nps}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.ratings.quality ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.ratings.priceValue ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.ratings.punctuality ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.ratings.staff ? "fill-amber-400 text-amber-400" : "text-gray-300"
                            }`}
                          />
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
