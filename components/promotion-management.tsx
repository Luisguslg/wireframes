"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { Switch } from "@/components/ui/switch"
import { Tag, Plus, Edit, Trash2, Search, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react"
import { useState } from "react"

interface Promotion {
  id: string
  name: string
  discountType: "percentage" | "fixed"
  discountValue: number
  applicableTo: string[]
  startDate: string
  endDate: string
  conditions: string
  priority: number
  active: boolean
  conversions: number
  revenue: number
}

export function PromotionManagement() {
  const [view, setView] = useState<"list" | "create" | "edit">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null)

  const promotions: Promotion[] = [
    {
      id: "1",
      name: "50% OFF Europa",
      discountType: "percentage",
      discountValue: 50,
      applicableTo: ["Vuelos", "Paquetes"],
      startDate: "2025-02-15",
      endDate: "2025-03-31",
      conditions: "Válido para reservas con 30 días de anticipación",
      priority: 1,
      active: true,
      conversions: 145,
      revenue: 42350,
    },
    {
      id: "2",
      name: "Caribe Todo Incluido",
      discountType: "fixed",
      discountValue: 500,
      applicableTo: ["Paquetes", "Hoteles"],
      startDate: "2025-03-01",
      endDate: "2025-04-30",
      conditions: "Mínimo 7 noches",
      priority: 2,
      active: true,
      conversions: 89,
      revenue: 28240,
    },
    {
      id: "3",
      name: "Black Friday Viajes",
      discountType: "percentage",
      discountValue: 30,
      applicableTo: ["Todos"],
      startDate: "2024-11-24",
      endDate: "2024-11-30",
      conditions: "Sin restricciones",
      priority: 1,
      active: false,
      conversions: 234,
      revenue: 89450,
    },
  ]

  const filteredPromotions = promotions.filter((promo) => {
    const matchesSearch = promo.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && promo.active) ||
      (statusFilter === "inactive" && !promo.active)
    return matchesSearch && matchesStatus
  })

  if (view === "create" || view === "edit") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-[#E91E63]" />
                {view === "create" ? "Crear Nueva Promoción" : "Editar Promoción"}
              </CardTitle>
              <CardDescription>
                {view === "create"
                  ? "Configure descuentos y ofertas especiales"
                  : "Modifique los datos de la promoción"}
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
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Promoción *</Label>
                <Input id="name" placeholder="Ej: 50% OFF Europa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad *</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Alta (1)</SelectItem>
                    <SelectItem value="2">Media (2)</SelectItem>
                    <SelectItem value="3">Baja (3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="discountType">Tipo de Descuento *</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentaje (%)</SelectItem>
                    <SelectItem value="fixed">Monto Fijo (USD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">Valor del Descuento *</Label>
                <Input id="discountValue" type="number" placeholder="50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Aplicable a *</Label>
              <div className="grid gap-3 md:grid-cols-3">
                {["Vuelos", "Hoteles", "Cruceros", "Paquetes", "Tours", "Traslados"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                  >
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de Inicio *</Label>
                <Input id="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de Fin *</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Condiciones y Restricciones</Label>
              <Textarea
                id="conditions"
                placeholder="Ej: Válido para reservas con 30 días de anticipación..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner">Banner de Promoción</Label>
              <Input id="banner" type="file" accept="image/*" />
              <p className="text-xs text-muted-foreground">Imagen para destacar en homepage (1200x400px recomendado)</p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="active">Activar Promoción</Label>
                <p className="text-sm text-muted-foreground">La promoción estará visible para los clientes</p>
              </div>
              <Switch id="active" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                {view === "create" ? "Crear Promoción" : "Guardar Cambios"}
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
              <Tag className="h-5 w-5 text-[#E91E63]" />
              Gestión de Promociones
            </CardTitle>
            <CardDescription>Crear, editar y gestionar ofertas y descuentos</CardDescription>
          </div>
          <Button onClick={() => setView("create")} className="bg-[#E91E63] hover:bg-[#C2185B]">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Promoción
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar promociones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="active">Activas</SelectItem>
                <SelectItem value="inactive">Inactivas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descuento</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead>Rendimiento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron promociones
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPromotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.name}</TableCell>
                      <TableCell>
                        {promo.discountType === "percentage" ? `${promo.discountValue}%` : `$${promo.discountValue}`}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(promo.startDate).toLocaleDateString()} -{" "}
                        {new Date(promo.endDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{promo.conversions} conversiones</p>
                          <p className="text-muted-foreground">${promo.revenue.toLocaleString()}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={promo.active ? "default" : "secondary"}
                          className={promo.active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {promo.active ? "Activa" : "Inactiva"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setView("edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedPromo(promo)
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
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredPromotions.length} de {promotions.length} promociones
            </p>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la promoción "{selectedPromo?.name}"? Esta acción no se puede
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
                console.log("Deleting promotion:", selectedPromo?.name)
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
