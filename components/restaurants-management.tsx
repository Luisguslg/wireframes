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
import { Utensils, Plus, Search, Edit, Trash2, Eye, ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Restaurant {
  id: string
  name: string
  city: string
  country: string
  cuisine: string
  ambiance: string
  priceRange: string
  rating: number
  description: string
  photos: string[]
}

export function RestaurantsManagement() {
  const [view, setView] = useState<"list" | "create" | "edit">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [cityFilter, setCityFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)

  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "La Parrilla del Chef",
      city: "Punta Cana",
      country: "República Dominicana",
      cuisine: "Caribeña",
      ambiance: "Casual Elegante",
      priceRange: "$$",
      rating: 4.5,
      description: "Especialidad en mariscos frescos y carnes a la parrilla con vista al mar",
      photos: [],
    },
    {
      id: "2",
      name: "Trattoria Bella Vista",
      city: "Roma",
      country: "Italia",
      cuisine: "Italiana",
      ambiance: "Romántico",
      priceRange: "$$$",
      rating: 4.8,
      description: "Auténtica cocina italiana con terraza panorámica del Coliseo",
      photos: [],
    },
    {
      id: "3",
      name: "Sushi Zen",
      city: "Cancún",
      country: "México",
      cuisine: "Japonesa",
      ambiance: "Moderno",
      priceRange: "$$$",
      rating: 4.6,
      description: "Sushi de alta calidad con ingredientes locales y técnicas tradicionales",
      photos: [],
    },
  ]

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = cityFilter === "all" || restaurant.city === cityFilter
    return matchesSearch && matchesCity
  })

  if (view === "create" || view === "edit") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-[#E91E63]" />
                {view === "create" ? "Agregar Nuevo Restaurante" : "Editar Restaurante"}
              </CardTitle>
              <CardDescription>
                {view === "create"
                  ? "Complete los datos del restaurante recomendado"
                  : "Modifique los datos del restaurante"}
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
                <Label htmlFor="name">Nombre del Restaurante *</Label>
                <Input id="name" placeholder="La Parrilla del Chef" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cuisine">Tipo de Comida *</Label>
                <Select defaultValue="caribbean">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="caribbean">Caribeña</SelectItem>
                    <SelectItem value="italian">Italiana</SelectItem>
                    <SelectItem value="japanese">Japonesa</SelectItem>
                    <SelectItem value="mexican">Mexicana</SelectItem>
                    <SelectItem value="french">Francesa</SelectItem>
                    <SelectItem value="spanish">Española</SelectItem>
                    <SelectItem value="international">Internacional</SelectItem>
                    <SelectItem value="seafood">Mariscos</SelectItem>
                    <SelectItem value="steakhouse">Parrilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad *</Label>
                <Input id="city" placeholder="Punta Cana" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País *</Label>
                <Input id="country" placeholder="República Dominicana" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Clasificación *</Label>
                <Select defaultValue="4.5">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5.0)</SelectItem>
                    <SelectItem value="4.5">⭐⭐⭐⭐½ (4.5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4.0)</SelectItem>
                    <SelectItem value="3.5">⭐⭐⭐½ (3.5)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ambiance">Ambiente *</Label>
                <Select defaultValue="casual-elegant">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="casual-elegant">Casual Elegante</SelectItem>
                    <SelectItem value="romantic">Romántico</SelectItem>
                    <SelectItem value="modern">Moderno</SelectItem>
                    <SelectItem value="traditional">Tradicional</SelectItem>
                    <SelectItem value="family">Familiar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceRange">Rango de Precio *</Label>
                <Select defaultValue="$$">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$ - Económico</SelectItem>
                    <SelectItem value="$$">$$ - Moderado</SelectItem>
                    <SelectItem value="$$$">$$$ - Alto</SelectItem>
                    <SelectItem value="$$$$">$$$$ - Muy Alto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea
                id="description"
                placeholder="Descripción del restaurante, especialidades, ambiente..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación / Dirección</Label>
              <Input id="location" placeholder="Av. Principal, Zona Hotelera" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Fotos del Restaurante</Label>
              <Input id="photos" type="file" multiple accept="image/*" />
              <p className="text-xs text-muted-foreground">Sube hasta 8 imágenes (JPG, PNG, máx. 5MB cada una)</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                {view === "create" ? "Agregar Restaurante" : "Guardar Cambios"}
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
              <Utensils className="h-5 w-5 text-[#E91E63]" />
              Restaurantes Recomendados
            </CardTitle>
            <CardDescription>Gestionar guía de restaurantes por destino</CardDescription>
          </div>
          <Button onClick={() => setView("create")} className="bg-[#E91E63] hover:bg-[#C2185B]">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Restaurante
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
                placeholder="Buscar restaurantes o ciudades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ciudades</SelectItem>
                <SelectItem value="Punta Cana">Punta Cana</SelectItem>
                <SelectItem value="Roma">Roma</SelectItem>
                <SelectItem value="Cancún">Cancún</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Tipo de Comida</TableHead>
                  <TableHead>Ambiente</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Calificación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRestaurants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron restaurantes
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRestaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell className="font-medium">{restaurant.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{restaurant.city}</p>
                          <p className="text-muted-foreground">{restaurant.country}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{restaurant.cuisine}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">{restaurant.ambiance}</TableCell>
                      <TableCell className="font-medium">{restaurant.priceRange}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{restaurant.rating}</span>
                        </div>
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
                              setSelectedRestaurant(restaurant)
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
              Mostrando {filteredRestaurants.length} de {restaurants.length} restaurantes
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
              ¿Estás seguro de que deseas eliminar el restaurante "{selectedRestaurant?.name}"? Esta acción no se puede
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
                console.log("[v0] Deleting restaurant:", selectedRestaurant?.name)
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
