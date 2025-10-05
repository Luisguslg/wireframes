"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Plane,
  Calendar,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Plus,
  Edit,
  CheckCircle2,
  AlertCircle,
  Upload,
} from "lucide-react"
import { useState } from "react"

export function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Provider Header */}
      <div className="bg-blue-900 text-white border-b border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Portal de Proveedores</h1>
                <p className="text-sm text-blue-200">Aerolínea Internacional XYZ</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Proveedor Verificado</p>
                <p className="text-xs text-blue-200">ID: PRV-2025-001</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <Card className="sticky top-4">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === "overview" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab("overview")}
                  >
                    <TrendingUp className="h-4 w-4" />
                    Resumen
                  </Button>
                  <Button
                    variant={activeTab === "services" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab("services")}
                  >
                    <Plane className="h-4 w-4" />
                    Mis Servicios
                  </Button>
                  <Button
                    variant={activeTab === "availability" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab("availability")}
                  >
                    <Calendar className="h-4 w-4" />
                    Disponibilidad
                  </Button>
                  <Button
                    variant={activeTab === "pricing" ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3"
                    onClick={() => setActiveTab("pricing")}
                  >
                    <DollarSign className="h-4 w-4" />
                    Tarifas
                  </Button>
                  <div className="my-4 border-t" />
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <Settings className="h-4 w-4" />
                    Configuración
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Reservas Activas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">145</div>
                      <p className="text-xs text-green-600 mt-1">+12 esta semana</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos del Mes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">$89,450</div>
                      <p className="text-xs text-green-600 mt-1">+8% vs mes anterior</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Ocupación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">78%</div>
                      <p className="text-xs text-blue-600 mt-1">Promedio mensual</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Calificación</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">4.8</div>
                      <p className="text-xs text-muted-foreground mt-1">De 234 reseñas</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      Reservas Recientes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          id: "VU2025-ABC123",
                          route: "Caracas → Madrid",
                          date: "15 Mar 2025",
                          passengers: 2,
                          status: "confirmed",
                        },
                        {
                          id: "VU2025-DEF456",
                          route: "Madrid → Caracas",
                          date: "22 Mar 2025",
                          passengers: 2,
                          status: "confirmed",
                        },
                        {
                          id: "VU2025-GHI789",
                          route: "Caracas → Buenos Aires",
                          date: "10 Abr 2025",
                          passengers: 4,
                          status: "pending",
                        },
                      ].map((booking, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-semibold">{booking.route}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.id} • {booking.date} • {booking.passengers} pasajeros
                            </p>
                          </div>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                            className={booking.status === "confirmed" ? "bg-green-500" : ""}
                          >
                            {booking.status === "confirmed" ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Confirmada
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-3 w-3 mr-1" />
                                Pendiente
                              </>
                            )}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === "services" && (
              <div className="space-y-6">
                {/* Add Service */}
                <Card>
                  <CardHeader className="bg-blue-900 text-white">
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Agregar Nuevo Servicio
                    </CardTitle>
                    <CardDescription className="text-blue-200">Registra vuelos, rutas y horarios</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="service-type">Tipo de Servicio</Label>
                        <Select>
                          <SelectTrigger id="service-type">
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flight">Vuelo</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="cruise">Crucero</SelectItem>
                            <SelectItem value="tour">Tour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-name">Nombre del Servicio</Label>
                        <Input id="service-name" placeholder="Ej: Vuelo CCS-MAD" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-origin">Origen</Label>
                        <Input id="service-origin" placeholder="Caracas (CCS)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-destination">Destino</Label>
                        <Input id="service-destination" placeholder="Madrid (MAD)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-capacity">Capacidad</Label>
                        <Input id="service-capacity" type="number" placeholder="180" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service-price">Precio Base (USD)</Label>
                        <Input id="service-price" type="number" placeholder="850" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="service-description">Descripción</Label>
                        <Textarea id="service-description" placeholder="Describe el servicio..." rows={3} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Fotos del Servicio</Label>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Arrastra fotos aquí o haz clic para subir</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-900 hover:bg-blue-800">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Servicio
                    </Button>
                  </CardContent>
                </Card>

                {/* Services List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      Mis Servicios Activos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Vuelo CCS-MAD",
                          route: "Caracas → Madrid",
                          capacity: "180 asientos",
                          price: "$850",
                          status: "active",
                        },
                        {
                          name: "Vuelo MAD-CCS",
                          route: "Madrid → Caracas",
                          capacity: "180 asientos",
                          price: "$920",
                          status: "active",
                        },
                      ].map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <p className="font-semibold">{service.name}</p>
                              <Badge className="bg-green-500">Activo</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {service.route} • {service.capacity} • {service.price}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === "availability" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Gestión de Disponibilidad
                  </CardTitle>
                  <CardDescription>Actualiza la disponibilidad de tus servicios en tiempo real</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Calendario de disponibilidad...</p>
                </CardContent>
              </Card>
            )}

            {/* Pricing Tab */}
            {activeTab === "pricing" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    Gestión de Tarifas
                  </CardTitle>
                  <CardDescription>Define precios y promociones para tus servicios</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Configuración de tarifas...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
