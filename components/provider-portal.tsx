"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Building2,
  Package,
  Calendar,
  DollarSign,
  Eye,
  Edit,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  LogOut,
  Settings,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  type: "hotel" | "flight" | "tour" | "transfer"
  available: number
  booked: number
  price: number
  currency: string
  status: "available" | "limited" | "sold-out"
  lastUpdated: string
}

interface Booking {
  id: string
  customerName: string
  service: string
  checkIn: string
  checkOut: string
  guests: number
  amount: number
  status: "confirmed" | "pending" | "cancelled"
  bookingDate: string
}

export function ProviderPortal() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const stats = {
    totalInventory: 245,
    availableUnits: 189,
    bookedUnits: 56,
    revenue: 45890,
    bookingsToday: 12,
    occupancyRate: 78,
  }

  const inventory: InventoryItem[] = [
    {
      id: "1",
      name: "Habitación Deluxe Vista al Mar",
      type: "hotel",
      available: 8,
      booked: 12,
      price: 150,
      currency: "USD",
      status: "available",
      lastUpdated: "2025-02-10 14:30",
    },
    {
      id: "2",
      name: "Suite Presidencial",
      type: "hotel",
      available: 2,
      booked: 3,
      price: 450,
      currency: "USD",
      status: "limited",
      lastUpdated: "2025-02-10 09:15",
    },
    {
      id: "3",
      name: "Tour Ciudad Colonial",
      type: "tour",
      available: 0,
      booked: 25,
      price: 89,
      currency: "USD",
      status: "sold-out",
      lastUpdated: "2025-02-09 16:45",
    },
  ]

  const bookings: Booking[] = [
    {
      id: "BK-2025-001",
      customerName: "Juan Pérez",
      service: "Habitación Deluxe Vista al Mar",
      checkIn: "2025-02-15",
      checkOut: "2025-02-20",
      guests: 2,
      amount: 750,
      status: "confirmed",
      bookingDate: "2025-02-10",
    },
    {
      id: "BK-2025-002",
      customerName: "María González",
      service: "Suite Presidencial",
      checkIn: "2025-02-18",
      checkOut: "2025-02-22",
      guests: 4,
      amount: 1800,
      status: "pending",
      bookingDate: "2025-02-10",
    },
  ]

  const filteredInventory = inventory.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Provider Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Portal de Proveedores</h1>
                <p className="text-sm text-slate-400">Hotel Caribe Paradise - Gestión de Inventario</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Hotel Manager</p>
                <p className="text-xs text-slate-400">manager@caribeparadise.com</p>
              </div>
              <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="inventory">Inventario</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="pricing">Precios</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Panel de Control</h2>
              <p className="text-sm text-muted-foreground">Resumen de tu inventario y reservas</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Inventario Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalInventory}</div>
                  <p className="text-xs text-muted-foreground mt-1">Unidades totales</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Unidades Disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.availableUnits}</div>
                  <p className="text-xs text-green-600 mt-1">Listas para reservar</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Unidades Reservadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.bookedUnits}</div>
                  <p className="text-xs text-blue-600 mt-1">Ocupación actual</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos del Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${stats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Reservas Hoy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.bookingsToday}</div>
                  <p className="text-xs text-blue-600 mt-1">+3 vs ayer</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Ocupación</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.occupancyRate}%</div>
                  <p className="text-xs text-green-600 mt-1">+5% vs promedio</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#E91E63]" />
                  Reservas Recientes
                </CardTitle>
                <CardDescription>Últimas reservas confirmadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{booking.customerName}</p>
                          <Badge
                            variant={
                              booking.status === "confirmed"
                                ? "default"
                                : booking.status === "pending"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              booking.status === "confirmed" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                            }
                          >
                            {booking.status === "confirmed" ? "Confirmada" : "Pendiente"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{booking.service}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.checkIn} - {booking.checkOut} • {booking.guests} huéspedes
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#E91E63]">${booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inventory Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  Alertas de Inventario
                </CardTitle>
                <CardDescription>Productos que requieren atención</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventory
                    .filter((item) => item.status === "limited" || item.status === "sold-out")
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-amber-50"
                      >
                        <div className="flex items-center gap-3">
                          {item.status === "sold-out" ? (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-amber-600" />
                          )}
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.status === "sold-out"
                                ? "Agotado - Actualizar inventario"
                                : `Solo ${item.available} unidades disponibles`}
                            </p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedItem(item)
                            setUpdateDialogOpen(true)
                          }}
                        >
                          Actualizar
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-[#E91E63]" />
                      Gestión de Inventario
                    </CardTitle>
                    <CardDescription>Administrar disponibilidad y stock</CardDescription>
                  </div>
                  <Button className="bg-[#E91E63] hover:bg-[#C2185B]">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productos..."
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
                          <TableHead>Producto</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Disponible</TableHead>
                          <TableHead>Reservado</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Última Actualización</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInventory.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No se encontraron productos
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredInventory.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {item.type === "hotel"
                                    ? "Hotel"
                                    : item.type === "flight"
                                      ? "Vuelo"
                                      : item.type === "tour"
                                        ? "Tour"
                                        : "Traslado"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`font-medium ${item.available === 0 ? "text-red-600" : item.available < 5 ? "text-amber-600" : "text-green-600"}`}
                                >
                                  {item.available}
                                </span>
                              </TableCell>
                              <TableCell className="text-blue-600 font-medium">{item.booked}</TableCell>
                              <TableCell className="font-medium">
                                {item.currency} ${item.price}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    item.status === "available"
                                      ? "default"
                                      : item.status === "limited"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className={
                                    item.status === "available"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : item.status === "limited"
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                        : ""
                                  }
                                >
                                  {item.status === "available"
                                    ? "Disponible"
                                    : item.status === "limited"
                                      ? "Limitado"
                                      : "Agotado"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm">{item.lastUpdated}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => {
                                      setSelectedItem(item)
                                      setUpdateDialogOpen(true)
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Mostrando {filteredInventory.length} productos</p>
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
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#E91E63]" />
                  Reservas
                </CardTitle>
                <CardDescription>Gestionar reservas confirmadas y pendientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar reservas..." className="pl-9" />
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID Reserva</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Servicio</TableHead>
                          <TableHead>Check-in</TableHead>
                          <TableHead>Check-out</TableHead>
                          <TableHead>Huéspedes</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.customerName}</TableCell>
                            <TableCell className="text-sm">{booking.service}</TableCell>
                            <TableCell>{booking.checkIn}</TableCell>
                            <TableCell>{booking.checkOut}</TableCell>
                            <TableCell>{booking.guests}</TableCell>
                            <TableCell className="font-medium">${booking.amount}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : booking.status === "pending"
                                      ? "secondary"
                                      : "outline"
                                }
                                className={
                                  booking.status === "confirmed" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                                }
                              >
                                {booking.status === "confirmed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                {booking.status === "confirmed"
                                  ? "Confirmada"
                                  : booking.status === "pending"
                                    ? "Pendiente"
                                    : "Cancelada"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#E91E63]" />
                  Gestión de Precios
                </CardTitle>
                <CardDescription>Actualizar tarifas y precios dinámicos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Precios Dinámicos</h4>
                    <p className="text-sm text-blue-800">
                      Configura reglas de precios basadas en temporada, ocupación y demanda para maximizar ingresos.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {inventory.map((item) => (
                      <Card key={item.id}>
                        <CardHeader>
                          <CardTitle className="text-base">{item.name}</CardTitle>
                          <CardDescription>Precio actual y ajustes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`price-${item.id}`}>Precio Base</Label>
                            <div className="flex gap-2">
                              <Input
                                id={`price-${item.id}`}
                                type="number"
                                defaultValue={item.price}
                                className="flex-1"
                              />
                              <Select defaultValue={item.currency}>
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Ajuste por Temporada</Label>
                            <Select defaultValue="normal">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Baja (-20%)</SelectItem>
                                <SelectItem value="normal">Normal (0%)</SelectItem>
                                <SelectItem value="high">Alta (+30%)</SelectItem>
                                <SelectItem value="peak">Pico (+50%)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button className="w-full bg-transparent" variant="outline">
                            Actualizar Precio
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Update Inventory Dialog */}
      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Actualizar Inventario</DialogTitle>
            <DialogDescription>Modifica la disponibilidad de "{selectedItem?.name}"</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="available">Unidades Disponibles</Label>
              <Input id="available" type="number" defaultValue={selectedItem?.available} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea id="notes" placeholder="Razón de la actualización..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#E91E63] hover:bg-[#C2185B]"
              onClick={() => {
                console.log("[v0] Updating inventory:", selectedItem?.name)
                setUpdateDialogOpen(false)
              }}
            >
              Actualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
