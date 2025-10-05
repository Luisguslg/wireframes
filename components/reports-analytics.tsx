"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileBarChart,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  MapPin,
  Plane,
  Tag,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  Plus,
  Play,
  Save,
  Mail,
  Filter,
  Search,
} from "lucide-react"
import { useState } from "react"

export function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [showBuilder, setShowBuilder] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const reportCatalog = [
    {
      id: 1,
      name: "Reporte de Ventas Diarias",
      category: "Ventas",
      description: "Resumen de reservas y ventas por día",
      frequency: "Diario",
      lastRun: "2025-02-10 08:00",
      icon: DollarSign,
    },
    {
      id: 2,
      name: "Análisis de Destinos Populares",
      category: "Destinos",
      description: "Top destinos por reservas e ingresos",
      frequency: "Semanal",
      lastRun: "2025-02-08 09:00",
      icon: MapPin,
    },
    {
      id: 3,
      name: "Rendimiento de Promociones",
      category: "Marketing",
      description: "Efectividad de promociones activas",
      frequency: "Semanal",
      lastRun: "2025-02-08 10:00",
      icon: Tag,
    },
    {
      id: 4,
      name: "Comportamiento de Clientes",
      category: "Clientes",
      description: "Patrones de compra y preferencias",
      frequency: "Mensual",
      lastRun: "2025-02-01 08:00",
      icon: Users,
    },
    {
      id: 5,
      name: "Ocupación de Servicios",
      category: "Operaciones",
      description: "Tasas de ocupación de vuelos, hoteles y tours",
      frequency: "Diario",
      lastRun: "2025-02-10 07:00",
      icon: Plane,
    },
    {
      id: 6,
      name: "Análisis de Cancelaciones",
      category: "Operaciones",
      description: "Motivos y patrones de cancelaciones",
      frequency: "Semanal",
      lastRun: "2025-02-08 11:00",
      icon: TrendingUp,
    },
    {
      id: 7,
      name: "Ingresos por Método de Pago",
      category: "Finanzas",
      description: "Distribución de pagos y comisiones",
      frequency: "Mensual",
      lastRun: "2025-02-01 09:00",
      icon: DollarSign,
    },
    {
      id: 8,
      name: "Tiempo de Respuesta Postventa",
      category: "Servicio",
      description: "Métricas de atención al cliente",
      frequency: "Semanal",
      lastRun: "2025-02-08 12:00",
      icon: Clock,
    },
  ]

  const scheduledReports = [
    {
      id: 1,
      name: "Reporte Ejecutivo Semanal",
      schedule: "Lunes 8:00 AM",
      recipients: "admin@viajesucab.com, gerencia@viajesucab.com",
      format: "PDF",
      status: "active",
    },
    {
      id: 2,
      name: "Análisis de Ventas Mensual",
      schedule: "Primer día del mes 9:00 AM",
      recipients: "ventas@viajesucab.com",
      format: "Excel",
      status: "active",
    },
    {
      id: 3,
      name: "Reporte de Inventario",
      schedule: "Diario 7:00 AM",
      recipients: "operaciones@viajesucab.com",
      format: "CSV",
      status: "paused",
    },
  ]

  const savedReports = [
    {
      id: 1,
      name: "Análisis Q4 2024",
      createdBy: "Admin Principal",
      createdAt: "2025-01-15",
      type: "Ventas por Destino",
    },
    {
      id: 2,
      name: "Campaña Black Friday - Resultados",
      createdBy: "Marketing Manager",
      createdAt: "2024-12-05",
      type: "Marketing",
    },
    {
      id: 3,
      name: "Clientes VIP - Comportamiento",
      createdBy: "Admin Principal",
      createdAt: "2025-01-20",
      type: "Clientes",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reportes y Analytics</h2>
          <p className="text-sm text-muted-foreground">Catálogo de reportes y constructor ad-hoc</p>
        </div>
        <Button onClick={() => setShowBuilder(!showBuilder)} className="gap-2">
          <Plus className="h-4 w-4" />
          Crear Reporte Personalizado
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="catalog">Catálogo</TabsTrigger>
          <TabsTrigger value="builder">Constructor</TabsTrigger>
          <TabsTrigger value="scheduled">Programados</TabsTrigger>
          <TabsTrigger value="saved">Guardados</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileBarChart className="h-5 w-5 text-[#E91E63]" />
                    Catálogo de Reportes
                  </CardTitle>
                  <CardDescription>Reportes predefinidos listos para ejecutar</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar reportes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reportCatalog.map((report) => {
                  const Icon = report.icon
                  return (
                    <Card key={report.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E91E63]/10">
                            <Icon className="h-5 w-5 text-[#E91E63]" />
                          </div>
                          <Badge variant="outline">{report.category}</Badge>
                        </div>
                        <CardTitle className="text-base">{report.name}</CardTitle>
                        <CardDescription className="text-sm">{report.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>
                            <span className="font-medium">Frecuencia:</span> {report.frequency}
                          </p>
                          <p>
                            <span className="font-medium">Última ejecución:</span> {report.lastRun}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                            <Play className="h-3 w-3" />
                            Ejecutar
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-900 text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Constructor de Reportes Ad-Hoc
              </CardTitle>
              <CardDescription className="text-slate-300">
                Crea reportes personalizados con los datos que necesites
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="report-name">Nombre del Reporte</Label>
                <Input id="report-name" placeholder="Ej: Análisis de Ventas Q1 2025" />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Fuente de Datos</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="data-bookings" />
                    <label htmlFor="data-bookings" className="text-sm font-medium cursor-pointer">
                      Reservas
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="data-customers" />
                    <label htmlFor="data-customers" className="text-sm font-medium cursor-pointer">
                      Clientes
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="data-services" />
                    <label htmlFor="data-services" className="text-sm font-medium cursor-pointer">
                      Servicios
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="data-promotions" />
                    <label htmlFor="data-promotions" className="text-sm font-medium cursor-pointer">
                      Promociones
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="data-payments" />
                    <label htmlFor="data-payments" className="text-sm font-medium cursor-pointer">
                      Pagos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="data-cancellations" />
                    <label htmlFor="data-cancellations" className="text-sm font-medium cursor-pointer">
                      Cancelaciones
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Métricas a Incluir</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="metric-count" defaultChecked />
                    <label htmlFor="metric-count" className="text-sm font-medium cursor-pointer">
                      Cantidad
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="metric-revenue" defaultChecked />
                    <label htmlFor="metric-revenue" className="text-sm font-medium cursor-pointer">
                      Ingresos
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="metric-avg" />
                    <label htmlFor="metric-avg" className="text-sm font-medium cursor-pointer">
                      Promedio
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="metric-growth" />
                    <label htmlFor="metric-growth" className="text-sm font-medium cursor-pointer">
                      Crecimiento %
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="metric-conversion" />
                    <label htmlFor="metric-conversion" className="text-sm font-medium cursor-pointer">
                      Tasa Conversión
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <Checkbox id="metric-roi" />
                    <label htmlFor="metric-roi" className="text-sm font-medium cursor-pointer">
                      ROI
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date-from">Fecha Desde</Label>
                  <Input id="date-from" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-to">Fecha Hasta</Label>
                  <Input id="date-to" type="date" />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Filtros</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="filter-destination">Destino</Label>
                    <Select>
                      <SelectTrigger id="filter-destination">
                        <SelectValue placeholder="Todos los destinos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los destinos</SelectItem>
                        <SelectItem value="punta-cana">Punta Cana</SelectItem>
                        <SelectItem value="cancun">Cancún</SelectItem>
                        <SelectItem value="madrid">Madrid</SelectItem>
                        <SelectItem value="buenos-aires">Buenos Aires</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-service">Tipo de Servicio</Label>
                    <Select>
                      <SelectTrigger id="filter-service">
                        <SelectValue placeholder="Todos los servicios" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los servicios</SelectItem>
                        <SelectItem value="flights">Vuelos</SelectItem>
                        <SelectItem value="hotels">Hoteles</SelectItem>
                        <SelectItem value="packages">Paquetes</SelectItem>
                        <SelectItem value="cruises">Cruceros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-payment">Método de Pago</Label>
                    <Select>
                      <SelectTrigger id="filter-payment">
                        <SelectValue placeholder="Todos los métodos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los métodos</SelectItem>
                        <SelectItem value="credit-card">Tarjeta de Crédito</SelectItem>
                        <SelectItem value="bank-transfer">Transferencia</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="crypto">Criptomonedas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="filter-status">Estado</Label>
                    <Select>
                      <SelectTrigger id="filter-status">
                        <SelectValue placeholder="Todos los estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="confirmed">Confirmadas</SelectItem>
                        <SelectItem value="pending">Pendientes</SelectItem>
                        <SelectItem value="cancelled">Canceladas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Agrupación</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar agrupación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Por Día</SelectItem>
                    <SelectItem value="week">Por Semana</SelectItem>
                    <SelectItem value="month">Por Mes</SelectItem>
                    <SelectItem value="destination">Por Destino</SelectItem>
                    <SelectItem value="service">Por Tipo de Servicio</SelectItem>
                    <SelectItem value="customer">Por Cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Tipo de Visualización</Label>
                <div className="grid gap-3 md:grid-cols-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <BarChart3 className="h-5 w-5 text-[#E91E63]" />
                    <label className="text-sm font-medium cursor-pointer">Barras</label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <LineChart className="h-5 w-5 text-[#E91E63]" />
                    <label className="text-sm font-medium cursor-pointer">Líneas</label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <PieChart className="h-5 w-5 text-[#E91E63]" />
                    <label className="text-sm font-medium cursor-pointer">Circular</label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <FileBarChart className="h-5 w-5 text-[#E91E63]" />
                    <label className="text-sm font-medium cursor-pointer">Tabla</label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 gap-2">
                  <Play className="h-4 w-4" />
                  Generar Reporte
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Save className="h-4 w-4" />
                  Guardar Configuración
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#E91E63]" />
                Vista Previa del Reporte
              </CardTitle>
              <CardDescription>Los datos se actualizarán al generar el reporte</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Configura los parámetros y genera el reporte</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#E91E63]" />
                    Reportes Programados
                  </CardTitle>
                  <CardDescription>Reportes que se generan y envían automáticamente</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Programar Reporte
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {scheduledReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{report.name}</h4>
                        <Badge className={report.status === "active" ? "bg-green-500" : "bg-amber-500"}>
                          {report.status === "active" ? "Activo" : "Pausado"}
                        </Badge>
                        <Badge variant="outline">{report.format}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {report.schedule}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {report.recipients}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Play className="h-3 w-3" />
                      Ejecutar Ahora
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      Editar
                    </Button>
                    {report.status === "active" ? (
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        Pausar
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        Activar
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="h-5 w-5 text-[#E91E63]" />
                Reportes Guardados
              </CardTitle>
              <CardDescription>Reportes personalizados que has creado anteriormente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold">{report.name}</h4>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Creado por {report.createdBy} el {report.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Play className="h-3 w-3" />
                        Ejecutar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Download className="h-3 w-3" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
