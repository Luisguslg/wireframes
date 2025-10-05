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
import { Package, Plus, Search, Edit, Trash2, Copy, Eye, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

type PackageStatus = "draft" | "published"

interface TourPackage {
  id: string
  name: string
  description: string
  nights: number
  basePrice: number
  currency: string
  milesPrice: number
  status: PackageStatus
  components: string[]
  includes: string
  excludes: string
  createdAt: string
}

export function PackagesManagement() {
  const [view, setView] = useState<"list" | "create" | "edit">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Mock data
  const packages: TourPackage[] = [
    {
      id: "1",
      name: "Paquete Caribe Todo Incluido",
      description: "7 noches en Punta Cana con vuelos, hotel 5 estrellas y traslados",
      nights: 7,
      basePrice: 1299,
      currency: "USD",
      milesPrice: 45000,
      status: "published",
      components: ["Vuelo", "Hotel", "Traslado"],
      includes: "Vuelos ida y vuelta, 7 noches en hotel 5*, traslados aeropuerto-hotel",
      excludes: "Seguro de viaje, excursiones opcionales",
      createdAt: "2025-02-01",
    },
    {
      id: "2",
      name: "Europa Clásica 15 Días",
      description: "Tour por París, Roma y Barcelona con guía en español",
      nights: 15,
      basePrice: 2899,
      currency: "USD",
      milesPrice: 95000,
      status: "published",
      components: ["Vuelo", "Hotel", "Tour", "Traslado"],
      includes: "Vuelos internacionales, hoteles 4*, tours guiados, desayunos",
      excludes: "Almuerzos y cenas, entradas a museos",
      createdAt: "2025-01-28",
    },
    {
      id: "3",
      name: "Crucero Mediterráneo",
      description: "10 noches navegando por el Mediterráneo",
      nights: 10,
      basePrice: 1899,
      currency: "USD",
      milesPrice: 65000,
      status: "draft",
      components: ["Vuelo", "Crucero"],
      includes: "Vuelos, crucero todo incluido, entretenimiento a bordo",
      excludes: "Excursiones en puertos, bebidas premium",
      createdAt: "2025-02-05",
    },
  ]

  const itemsPerPage = 10
  const totalPages = Math.ceil(packages.length / itemsPerPage)

  const filteredPackages = packages
    .filter((pkg) => {
      const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || pkg.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const aValue = a[sortField as keyof TourPackage]
      const bValue = b[sortField as keyof TourPackage]
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const handleDelete = (pkg: TourPackage) => {
    setSelectedPackage(pkg)
    setDeleteDialogOpen(true)
  }

  const handleDuplicate = (pkg: TourPackage) => {
    console.log("Duplicating package:", pkg.name)
    // Logic to duplicate package
  }

  const handlePublish = (pkg: TourPackage) => {
    console.log("Publishing package:", pkg.name)
    // Logic to publish/unpublish package
  }

  if (view === "create" || view === "edit") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#E91E63]" />
                {view === "create" ? "Crear Nuevo Paquete" : "Editar Paquete"}
              </CardTitle>
              <CardDescription>
                {view === "create"
                  ? "Complete los datos del nuevo paquete turístico"
                  : "Modifique los datos del paquete"}
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
                <Label htmlFor="name">Nombre del Paquete *</Label>
                <Input id="name" placeholder="Ej: Paquete Caribe Todo Incluido" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nights">Noches *</Label>
                <Input id="nights" type="number" placeholder="7" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea id="description" placeholder="Descripción detallada del paquete..." rows={3} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Precio Base *</Label>
                <Input id="basePrice" type="number" placeholder="1299" />
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
                    <SelectItem value="VES">VES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="milesPrice">Precio en Millas</Label>
                <Input id="milesPrice" type="number" placeholder="45000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Componentes del Paquete *</Label>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {["Vuelo", "Hotel", "Crucero", "Tour", "Traslado", "Actividad"].map((component) => (
                  <label
                    key={component}
                    className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                  >
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">{component}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="includes">Incluye *</Label>
              <Textarea id="includes" placeholder="Vuelos, hotel, traslados..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excludes">No Incluye</Label>
              <Textarea id="excludes" placeholder="Seguro de viaje, excursiones opcionales..." rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Fotos del Paquete</Label>
              <Input id="photos" type="file" multiple accept="image/*" />
              <p className="text-xs text-muted-foreground">Sube hasta 10 imágenes (JPG, PNG, máx. 5MB cada una)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select defaultValue="draft">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Los paquetes publicados deben tener al menos 1 componente y precio definido
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                {view === "create" ? "Crear Paquete" : "Guardar Cambios"}
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
              <Package className="h-5 w-5 text-[#E91E63]" />
              Gestión de Paquetes Turísticos
            </CardTitle>
            <CardDescription>Crear, editar y gestionar paquetes combinados</CardDescription>
          </div>
          <Button onClick={() => setView("create")} className="bg-[#E91E63] hover:bg-[#C2185B]">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Paquete
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
                placeholder="Buscar paquetes..."
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
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="published">Publicados</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => handleSort("name")}>
                      Nombre
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Noches</TableHead>
                  <TableHead>
                    <Button variant="ghost" size="sm" className="h-8 gap-1" onClick={() => handleSort("basePrice")}>
                      Precio
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Componentes</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No se encontraron paquetes
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>{pkg.nights} noches</TableCell>
                      <TableCell>
                        {pkg.currency} ${pkg.basePrice.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {pkg.components.slice(0, 2).map((comp) => (
                            <Badge key={comp} variant="outline" className="text-xs">
                              {comp}
                            </Badge>
                          ))}
                          {pkg.components.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{pkg.components.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={pkg.status === "published" ? "default" : "secondary"}
                          className={pkg.status === "published" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {pkg.status === "published" ? "Publicado" : "Borrador"}
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
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicate(pkg)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(pkg)}
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
              Mostrando {filteredPackages.length} de {packages.length} paquetes
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
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
              ¿Estás seguro de que deseas eliminar el paquete "{selectedPackage?.name}"? Esta acción no se puede
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
                console.log("Deleting package:", selectedPackage?.name)
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
