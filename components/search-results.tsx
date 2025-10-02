"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  Heart,
  Plane,
  Ship,
  Car,
  CheckCircle2,
  Plus,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

const mockResults = [
  {
    id: 1,
    title: "Paquete Todo Incluido - Punta Cana",
    destination: "Punta Cana, República Dominicana",
    price: 2450,
    duration: "7 noches",
    rating: 4.8,
    reviews: 234,
    image: "beach-resort",
    includes: ["Vuelo", "Hotel 5★", "Todo incluido", "Traslados"],
    type: "beach",
  },
  {
    id: 2,
    title: "Tour Europeo - Madrid y Barcelona",
    destination: "España",
    price: 3200,
    duration: "10 días",
    rating: 4.9,
    reviews: 189,
    image: "europe-tour",
    includes: ["Vuelo", "Hotel 4★", "Tours guiados", "Desayuno"],
    type: "cultural",
  },
  {
    id: 3,
    title: "Aventura en Patagonia",
    destination: "Argentina y Chile",
    price: 2890,
    duration: "8 días",
    rating: 4.7,
    reviews: 156,
    image: "patagonia",
    includes: ["Vuelo", "Alojamiento", "Excursiones", "Guía"],
    type: "adventure",
  },
  {
    id: 4,
    title: "Crucero por el Caribe",
    destination: "Caribe",
    price: 1950,
    duration: "5 noches",
    rating: 4.6,
    reviews: 312,
    image: "cruise",
    includes: ["Crucero", "Todo incluido", "Entretenimiento", "Excursiones"],
    type: "cruise",
  },
  {
    id: 5,
    title: "Safari en Kenia",
    destination: "Kenia, África",
    price: 4500,
    duration: "12 días",
    rating: 5.0,
    reviews: 98,
    image: "safari",
    includes: ["Vuelo", "Lodge", "Safaris", "Guía experto"],
    type: "adventure",
  },
  {
    id: 6,
    title: "Relax en Cancún",
    destination: "Cancún, México",
    price: 1850,
    duration: "5 noches",
    rating: 4.5,
    reviews: 421,
    image: "cancun",
    includes: ["Vuelo", "Hotel 4★", "Desayuno", "Traslados"],
    type: "beach",
  },
]

export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [compareList, setCompareList] = useState<number[]>([])

  const toggleCompare = (id: number) => {
    setCompareList((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredResults = mockResults.filter((result) => {
    const matchesPrice = result.price >= priceRange[0] && result.price <= priceRange[1]
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(result.type)
    return matchesPrice && matchesType
  })

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Encuentra tu próximo destino</h1>

          {/* Smart Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder='Ej: "viajes a la playa en diciembre" o "destinos para familias"'
                  className="pl-10 h-12 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="h-12 bg-[#E91E63] hover:bg-[#E91E63]/90 text-white px-8">Buscar</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block lg:w-80 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <Label>Rango de precio</Label>
                  <Slider
                    min={0}
                    max={5000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <Label>Duración</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Cualquier duración" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">1-3 días</SelectItem>
                      <SelectItem value="medium">4-7 días</SelectItem>
                      <SelectItem value="long">8-14 días</SelectItem>
                      <SelectItem value="extended">Más de 14 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Package Type */}
                <div className="space-y-3">
                  <Label>Tipo de paquete</Label>
                  <div className="space-y-2">
                    {[
                      { id: "beach", label: "Playa", icon: "🏖️" },
                      { id: "cultural", label: "Cultural", icon: "🏛️" },
                      { id: "adventure", label: "Aventura", icon: "🏔️" },
                      { id: "cruise", label: "Crucero", icon: "🚢" },
                      { id: "family", label: "Familiar", icon: "👨‍👩‍👧‍👦" },
                    ].map((type) => (
                      <label key={type.id} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type.id])
                            } else {
                              setSelectedTypes(selectedTypes.filter((t) => t !== type.id))
                            }
                          }}
                        />
                        <span className="text-sm">
                          {type.icon} {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transport Type */}
                <div className="space-y-3">
                  <Label>Tipo de transporte</Label>
                  <div className="space-y-2">
                    {[
                      { id: "flight", label: "Vuelo", icon: Plane },
                      { id: "cruise", label: "Crucero", icon: Ship },
                      { id: "car", label: "Terrestre", icon: Car },
                    ].map((transport) => (
                      <label key={transport.id} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox />
                        <transport.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{transport.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full bg-transparent">
                  Limpiar filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Results Section */}
          <div className="flex-1">
            {/* Mobile Filters & Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filtros de búsqueda</SheetTitle>
                      <SheetDescription>Personaliza tu búsqueda de viajes</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {/* Same filters as desktop sidebar */}
                      <div className="space-y-3">
                        <Label>Rango de precio</Label>
                        <Slider min={0} max={5000} step={100} value={priceRange} onValueChange={setPriceRange} />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-muted-foreground">{filteredResults.length} resultados encontrados</p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recomendados</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a menor</SelectItem>
                  <SelectItem value="rating">Mejor valorados</SelectItem>
                  <SelectItem value="duration">Duración</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Compare Bar */}
            {compareList.length > 0 && (
              <Card className="mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{compareList.length} paquete(s) seleccionado(s) para comparar</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                        Comparar ahora
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setCompareList([])}>
                        Limpiar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredResults.map((result) => (
                <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-[#E91E63]/20 to-[#C2185B]/20" />
                    <Button size="icon" variant="secondary" className="absolute top-3 right-3 rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge className="absolute bottom-3 left-3 bg-white text-gray-900">{result.duration}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{result.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {result.destination}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#E91E63]">${result.price}</p>
                        <p className="text-xs text-muted-foreground">por persona</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{result.rating}</span>
                      <span className="text-sm text-muted-foreground">({result.reviews} reseñas)</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.includes.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1 bg-[#E91E63] hover:bg-[#E91E63]/90">
                        <Link href={`/servicio/${result.id}`}>Ver detalles</Link>
                      </Button>
                      <Button asChild variant="outline" size="icon" className="bg-transparent">
                        <Link href="/carrito">
                          <ShoppingCart className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="icon" className="bg-transparent">
                        <Link href="/itinerario">
                          <Plus className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleCompare(result.id)}
                        className={compareList.includes(result.id) ? "bg-blue-50" : "bg-transparent"}
                      >
                        <CheckCircle2 className={`h-4 w-4 ${compareList.includes(result.id) ? "text-blue-600" : ""}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
