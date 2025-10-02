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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Leaf, Plus, Search, Edit, Trash2, ChevronLeft } from "lucide-react"

interface CarbonOffset {
  id: string
  name: string
  provider: string
  costPerTon: number
  currency: string
  description: string
  active: boolean
}

export function SustainabilityManagement() {
  const [view, setView] = useState<"overview" | "offsets" | "create">("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedOffset, setSelectedOffset] = useState<CarbonOffset | null>(null)

  const offsets: CarbonOffset[] = [
    {
      id: "1",
      name: "Reforestación Amazónica",
      provider: "Amazon Conservation",
      costPerTon: 15,
      currency: "USD",
      description: "Proyectos de reforestación en la Amazonía",
      active: true,
    },
    {
      id: "2",
      name: "Energía Solar Comunitaria",
      provider: "Solar for All",
      costPerTon: 12,
      currency: "USD",
      description: "Instalación de paneles solares en comunidades",
      active: true,
    },
    {
      id: "3",
      name: "Conservación Marina",
      provider: "Ocean Guardians",
      costPerTon: 18,
      currency: "USD",
      description: "Protección de ecosistemas marinos",
      active: false,
    },
  ]

  const stats = {
    totalCompensations: 1245,
    totalTonsCO2: 3567,
    totalAmount: 48950,
    activeProjects: 2,
  }

  const filteredOffsets = offsets.filter((offset) => offset.name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (view === "create") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-[#E91E63]" />
                Configurar Opción de Compensación
              </CardTitle>
              <CardDescription>Agregar nuevo proveedor de offsets de carbono</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setView("offsets")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Proyecto *</Label>
                <Input id="name" placeholder="Reforestación Amazónica" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">Proveedor *</Label>
                <Input id="provider" placeholder="Amazon Conservation" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea id="description" placeholder="Descripción del proyecto de compensación..." rows={3} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="costPerTon">Costo por Tonelada CO₂ *</Label>
                <Input id="costPerTon" type="number" step="0.01" placeholder="15.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda *</Label>
                <Select defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado *</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Sitio Web del Proyecto</Label>
              <Input id="website" type="url" placeholder="https://..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certification">Certificaciones</Label>
              <Input id="certification" placeholder="Gold Standard, VCS, etc." />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                Guardar Configuración
              </Button>
              <Button type="button" variant="outline" onClick={() => setView("offsets")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  if (view === "offsets") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-[#E91E63]" />
                Opciones de Compensación
              </CardTitle>
              <CardDescription>Gestionar proveedores de offsets de carbono</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setView("overview")}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <Button onClick={() => setView("create")} className="bg-[#E91E63] hover:bg-[#C2185B]">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Opción
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proyectos..."
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
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Costo/Ton CO₂</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffsets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No se encontraron proyectos
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOffsets.map((offset) => (
                      <TableRow key={offset.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{offset.name}</p>
                            <p className="text-sm text-muted-foreground">{offset.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{offset.provider}</TableCell>
                        <TableCell className="font-medium">
                          {offset.currency} ${offset.costPerTon}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={offset.active ? "default" : "secondary"}
                            className={offset.active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                          >
                            {offset.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedOffset(offset)
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
          </div>
        </CardContent>

        {/* Delete Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription>¿Estás seguro de que deseas eliminar "{selectedOffset?.name}"?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  console.log("Deleting offset:", selectedOffset?.name)
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

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compensaciones Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCompensations}</div>
            <p className="text-xs text-green-600 mt-1">+15% vs mes anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toneladas CO₂</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalTonsCO2.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">Compensadas este año</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monto Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">En compensaciones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Proyectos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">Disponibles para clientes</p>
          </CardContent>
        </Card>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-[#E91E63]" />
                Sostenibilidad y Compensación de Carbono
              </CardTitle>
              <CardDescription>Configurar cálculo de huella y opciones de compensación</CardDescription>
            </div>
            <Button onClick={() => setView("offsets")} className="bg-[#E91E63] hover:bg-[#C2185B]">
              Gestionar Opciones
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Cálculo de Huella de Carbono</h4>
              <p className="text-sm text-green-800 mb-3">
                El sistema calcula automáticamente la huella de carbono basándose en:
              </p>
              <ul className="text-sm text-green-800 space-y-1 ml-4">
                <li>• Distancia de vuelos (corta, media, larga distancia)</li>
                <li>• Tipo de alojamiento y duración</li>
                <li>• Traslados terrestres y marítimos</li>
              </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Configuración de Cálculo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vuelo corto ({"<"}1000km)</span>
                    <span className="font-medium">0.15 kg CO₂/km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vuelo medio (1000-3000km)</span>
                    <span className="font-medium">0.12 kg CO₂/km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Vuelo largo ({">"}3000km)</span>
                    <span className="font-medium">0.10 kg CO₂/km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hotel por noche</span>
                    <span className="font-medium">20 kg CO₂</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Proyectos Activos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {offsets
                    .filter((o) => o.active)
                    .map((offset) => (
                      <div key={offset.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="text-sm font-medium">{offset.name}</p>
                          <p className="text-xs text-muted-foreground">{offset.provider}</p>
                        </div>
                        <span className="text-sm font-medium">${offset.costPerTon}/ton</span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
