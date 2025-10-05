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
  Plane,
  Hotel,
  Ship,
  MapPinned,
  Car,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

type ServiceType = "flight" | "hotel" | "cruise" | "tour" | "transfer"

interface Service {
  id: string
  type: ServiceType
  name: string
  provider: string
  price: number
  currency: string
  capacity: number
  available: number
  status: "active" | "inactive"
}

export function ServicesManagement() {
  const [activeServiceType, setActiveServiceType] = useState<ServiceType>("flight")
  const [view, setView] = useState<"list" | "create" | "edit">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  // Mock data
  const services: Service[] = [
    {
      id: "1",
      type: "flight",
      name: "CCS - MIA",
      provider: "American Airlines",
      price: 450,
      currency: "USD",
      capacity: 180,
      available: 45,
      status: "active",
    },
    {
      id: "2",
      type: "hotel",
      name: "Hotel Caribe Paradise",
      provider: "Marriott",
      price: 180,
      currency: "USD",
      capacity: 200,
      available: 32,
      status: "active",
    },
    {
      id: "3",
      type: "cruise",
      name: "Mediterráneo 10 Días",
      provider: "Royal Caribbean",
      price: 1200,
      currency: "USD",
      capacity: 2000,
      available: 150,
      status: "active",
    },
  ]

  const filteredServices = services
    .filter((service) => service.type === activeServiceType)
    .filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5 text-[#E91E63]" />
      case "hotel":
        return <Hotel className="h-5 w-5 text-[#E91E63]" />
      case "cruise":
        return <Ship className="h-5 w-5 text-[#E91E63]" />
      case "tour":
        return <MapPinned className="h-5 w-5 text-[#E91E63]" />
      case "transfer":
        return <Car className="h-5 w-5 text-[#E91E63]" />
    }
  }

  const getServiceTitle = (type: ServiceType) => {
    switch (type) {
      case "flight":
        return "Vuelos"
      case "hotel":
        return "Hoteles"
      case "cruise":
        return "Cruceros"
      case "tour":
        return "Tours y Actividades"
      case "transfer":
        return "Traslados"
    }
  }

  const renderServiceForm = () => {
    switch (activeServiceType) {
      case "flight":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="airline">Aerolínea *</Label>
                <Input id="airline" placeholder="American Airlines" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="flightNumber">Número de Vuelo *</Label>
                <Input id="flightNumber" placeholder="AA1234" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="origin">Origen *</Label>
                <Input id="origin" placeholder="CCS - Caracas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino *</Label>
                <Input id="destination" placeholder="MIA - Miami" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="departureDate">Fecha de Salida *</Label>
                <Input id="departureDate" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="arrivalDate">Fecha de Llegada *</Label>
                <Input id="arrivalDate" type="datetime-local" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacidad *</Label>
                <Input id="capacity" type="number" placeholder="180" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Tarifa (USD) *</Label>
                <Input id="price" type="number" placeholder="450" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="class">Clase *</Label>
                <Select defaultValue="economy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Económica</SelectItem>
                    <SelectItem value="business">Ejecutiva</SelectItem>
                    <SelectItem value="first">Primera</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="baggage">Política de Equipaje</Label>
              <Textarea id="baggage" placeholder="1 maleta de 23kg incluida..." rows={2} />
            </div>
          </div>
        )
      case "hotel":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hotelName">Nombre del Hotel *</Label>
                <Input id="hotelName" placeholder="Hotel Caribe Paradise" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chain">Cadena Hotelera</Label>
                <Input id="chain" placeholder="Marriott" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <Input id="city" placeholder="Punta Cana" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stars">Categoría *</Label>
                <Select defaultValue="5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Estrellas</SelectItem>
                    <SelectItem value="4">4 Estrellas</SelectItem>
                    <SelectItem value="5">5 Estrellas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="roomType">Tipo de Habitación *</Label>
                <Select defaultValue="standard">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Estándar</SelectItem>
                    <SelectItem value="deluxe">Deluxe</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mealPlan">Plan de Alimentación *</Label>
                <Select defaultValue="all-inclusive">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room-only">Solo Habitación</SelectItem>
                    <SelectItem value="breakfast">Con Desayuno</SelectItem>
                    <SelectItem value="half-board">Media Pensión</SelectItem>
                    <SelectItem value="full-board">Pensión Completa</SelectItem>
                    <SelectItem value="all-inclusive">Todo Incluido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="rooms">Habitaciones Disponibles *</Label>
                <Input id="rooms" type="number" placeholder="50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pricePerNight">Tarifa por Noche (USD) *</Label>
                <Input id="pricePerNight" type="number" placeholder="180" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minNights">Noches Mínimas</Label>
                <Input id="minNights" type="number" placeholder="3" />
              </div>
            </div>
          </div>
        )
      case "cruise":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cruiseLine">Naviera *</Label>
                <Input id="cruiseLine" placeholder="Royal Caribbean" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ship">Barco *</Label>
                <Input id="ship" placeholder="Symphony of the Seas" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="route">Ruta / Puertos *</Label>
              <Textarea id="route" placeholder="Miami - Cozumel - Gran Caimán - Jamaica - Miami" rows={2} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="departureDate">Fecha de Zarpe *</Label>
                <Input id="departureDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duración (noches) *</Label>
                <Input id="duration" type="number" placeholder="7" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="cabinType">Tipo de Camarote *</Label>
                <Select defaultValue="interior">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interior">Interior</SelectItem>
                    <SelectItem value="oceanview">Vista al Mar</SelectItem>
                    <SelectItem value="balcony">Balcón</SelectItem>
                    <SelectItem value="suite">Suite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cabins">Camarotes Disponibles *</Label>
                <Input id="cabins" type="number" placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cruisePrice">Tarifa (USD) *</Label>
                <Input id="cruisePrice" type="number" placeholder="1200" />
              </div>
            </div>
          </div>
        )
      case "tour":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tourName">Nombre del Tour *</Label>
                <Input id="tourName" placeholder="City Tour París" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="operator">Operador *</Label>
                <Input id="operator" placeholder="Paris Tours Inc." />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tourDescription">Descripción *</Label>
              <Textarea id="tourDescription" placeholder="Recorrido por los principales monumentos..." rows={3} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="duration">Duración *</Label>
                <Input id="duration" placeholder="4 horas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourCapacity">Capacidad *</Label>
                <Input id="tourCapacity" type="number" placeholder="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tourPrice">Precio (USD) *</Label>
                <Input id="tourPrice" type="number" placeholder="85" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="includes">Incluye</Label>
              <Textarea id="includes" placeholder="Guía en español, transporte, entradas..." rows={2} />
            </div>
          </div>
        )
      case "transfer":
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="transferType">Tipo de Traslado *</Label>
                <Select defaultValue="ground">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ground">Terrestre</SelectItem>
                    <SelectItem value="maritime">Marítimo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle">Tipo de Vehículo *</Label>
                <Select defaultValue="sedan">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedan">Sedán</SelectItem>
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="transferOrigin">Origen *</Label>
                <Input id="transferOrigin" placeholder="Aeropuerto Internacional" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferDestination">Destino *</Label>
                <Input id="transferDestination" placeholder="Hotel Caribe Paradise" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="transferCapacity">Capacidad *</Label>
                <Input id="transferCapacity" type="number" placeholder="4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transferPrice">Tarifa (USD) *</Label>
                <Input id="transferPrice" type="number" placeholder="45" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Horario</Label>
                <Input id="schedule" placeholder="24/7" />
              </div>
            </div>
          </div>
        )
    }
  }

  if (view === "create" || view === "edit") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getServiceIcon(activeServiceType)}
                {view === "create" ? "Crear Nuevo Servicio" : "Editar Servicio"} - {getServiceTitle(activeServiceType)}
              </CardTitle>
              <CardDescription>
                {view === "create" ? "Complete los datos del nuevo servicio" : "Modifique los datos del servicio"}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setView("list")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {renderServiceForm()}

            <div className="space-y-2">
              <Label htmlFor="photos">Fotos del Servicio</Label>
              <Input id="photos" type="file" multiple accept="image/*" />
              <p className="text-xs text-muted-foreground">Sube hasta 10 imágenes (JPG, PNG, máx. 5MB cada una)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Descripción Adicional</Label>
              <Textarea id="serviceDescription" placeholder="Información adicional sobre el servicio..." rows={3} />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                {view === "create" ? "Crear Servicio" : "Guardar Cambios"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setView("list")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getServiceIcon(activeServiceType)}
              Gestión de Servicios
            </CardTitle>
            <CardDescription>Vuelos, hoteles, cruceros, tours y traslados</CardDescription>
          </div>
          <Button onClick={() => setView("create")} className="bg-[#E91E63] hover:bg-[#C2185B]">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Servicio
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeServiceType} onValueChange={(value) => setActiveServiceType(value as ServiceType)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="flight" className="gap-2">
              <Plane className="h-4 w-4" />
              Vuelos
            </TabsTrigger>
            <TabsTrigger value="hotel" className="gap-2">
              <Hotel className="h-4 w-4" />
              Hoteles
            </TabsTrigger>
            <TabsTrigger value="cruise" className="gap-2">
              <Ship className="h-4 w-4" />
              Cruceros
            </TabsTrigger>
            <TabsTrigger value="tour" className="gap-2">
              <MapPinned className="h-4 w-4" />
              Tours
            </TabsTrigger>
            <TabsTrigger value="transfer" className="gap-2">
              <Car className="h-4 w-4" />
              Traslados
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeServiceType} className="space-y-4 mt-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Buscar ${getServiceTitle(activeServiceType).toLowerCase()}...`}
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
                    <TableHead>Nombre</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Disponibilidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No se encontraron servicios
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.provider}</TableCell>
                        <TableCell>
                          {service.currency} ${service.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {service.available} / {service.capacity}
                            </span>
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#E91E63]"
                                style={{ width: `${(service.available / service.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={service.status === "active" ? "default" : "secondary"}
                            className={
                              service.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                            }
                          >
                            {service.status === "active" ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setView("edit")}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedService(service)
                                setDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
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
              <p className="text-sm text-muted-foreground">Mostrando {filteredServices.length} servicios</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el servicio "{selectedService?.name}"? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("[v0] Deleting service:", selectedService?.name)
                setDeleteDialogOpen(false)
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
