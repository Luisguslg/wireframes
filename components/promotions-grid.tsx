"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Flame, ArrowRight, Filter, X, Calendar } from "lucide-react"
import { WishlistButton } from "@/components/wishlist-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const promotions = [
  {
    id: "promo-caribe-1",
    name: "Caribe Todo Incluido",
    destination: "Cancún, México",
    description: "Paquete completo a Cancún con vuelo, hotel 5 estrellas y traslados",
    discount: "30% OFF",
    discountPercent: 30,
    originalPrice: 1299,
    price: 899,
    miles: 32000,
    validUntil: "2025-03-15",
    daysLeft: 33,
    savings: 400,
    image: "/cancun-beach-resort.png",
    type: "Aéreo",
    isHotDeal: true,
  },
  {
    id: "promo-europa-1",
    name: "Europa Mágica",
    destination: "París, Roma & Barcelona",
    description: "Tour por París, Roma y Barcelona. 10 días inolvidables",
    discount: "25% OFF",
    discountPercent: 25,
    originalPrice: 1999,
    price: 1499,
    miles: 53000,
    validUntil: "2025-02-28",
    daysLeft: 18,
    savings: 500,
    image: "/eiffel-tower-paris.png",
    type: "Tour",
    isHotDeal: true,
  },
  {
    id: "promo-crucero-1",
    name: "Crucero Mediterráneo",
    destination: "Italia, Grecia & Turquía",
    description: "Navega por las costas más hermosas del Mediterráneo",
    discount: "40% OFF",
    discountPercent: 40,
    originalPrice: 2199,
    price: 1299,
    miles: 46000,
    validUntil: "2025-03-31",
    daysLeft: 49,
    savings: 900,
    image: "/luxury-cruise-ship-mediterranean.jpg",
    type: "Crucero",
    isHotDeal: true,
  },
  {
    id: "promo-miami-1",
    name: "Miami Beach Escape",
    destination: "Miami, Florida",
    description: "Disfruta de las playas de Miami con hotel frente al mar",
    discount: "35% OFF",
    discountPercent: 35,
    originalPrice: 899,
    price: 584,
    miles: 21000,
    validUntil: "2025-02-20",
    daysLeft: 10,
    savings: 315,
    image: "/miami-beach-skyline.png",
    type: "Aéreo",
    isHotDeal: true,
  },
  {
    id: "promo-argentina-1",
    name: "Buenos Aires Cultural",
    destination: "Buenos Aires, Argentina",
    description: "Explora la capital del tango con tours y shows incluidos",
    discount: "20% OFF",
    discountPercent: 20,
    originalPrice: 1299,
    price: 1039,
    miles: 37000,
    validUntil: "2025-04-15",
    daysLeft: 64,
    savings: 260,
    image: "/buenos-aires-obelisco-argentina.jpg",
    type: "Terrestre",
    isHotDeal: false,
  },
  {
    id: "promo-rio-1",
    name: "Río de Janeiro Carnaval",
    destination: "Río de Janeiro, Brasil",
    description: "Vive el carnaval más famoso del mundo con entradas VIP",
    discount: "15% OFF",
    discountPercent: 15,
    originalPrice: 1599,
    price: 1359,
    miles: 48000,
    validUntil: "2025-02-25",
    daysLeft: 15,
    savings: 240,
    image: "/rio-christ-redeemer.png",
    type: "Tour",
    isHotDeal: false,
  },
]

export function PromotionsGrid() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("discount")

  let filteredPromotions = promotions.filter((promo) => {
    const matchesType = selectedType === "all" || promo.type === selectedType
    return matchesType
  })

  // Sort promotions
  if (sortBy === "discount") {
    filteredPromotions = [...filteredPromotions].sort((a, b) => b.discountPercent - a.discountPercent)
  } else if (sortBy === "price") {
    filteredPromotions = [...filteredPromotions].sort((a, b) => a.price - b.price)
  } else if (sortBy === "ending") {
    filteredPromotions = [...filteredPromotions].sort((a, b) => a.daysLeft - b.daysLeft)
  }

  const clearFilters = () => {
    setSelectedType("all")
    setSortBy("discount")
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Todas las Promociones</h2>
            <p className="mt-2 text-sm text-muted-foreground">{filteredPromotions.length} ofertas activas</p>
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        {showFilters && (
          <Card className="mb-8 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Filtrar Promociones</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Limpiar
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Tipo de Servicio</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los servicios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los servicios</SelectItem>
                    <SelectItem value="Aéreo">Aéreo</SelectItem>
                    <SelectItem value="Terrestre">Terrestre</SelectItem>
                    <SelectItem value="Crucero">Crucero</SelectItem>
                    <SelectItem value="Tour">Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ordenar por</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Mayor descuento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Mayor descuento</SelectItem>
                    <SelectItem value="price">Menor precio</SelectItem>
                    <SelectItem value="ending">Próximas a vencer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPromotions.map((promo) => (
            <Card key={promo.id} className="group overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={promo.image || "/placeholder.svg"}
                  alt={promo.name}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Discount Badge */}
                <Badge className="absolute right-4 top-4 bg-[#E91E63] text-white border-0 text-base px-3 py-1">
                  {promo.discount}
                </Badge>

                {/* Hot Deal Badge */}
                {promo.isHotDeal && (
                  <Badge className="absolute left-4 top-4 bg-orange-500 text-white border-0 gap-1">
                    <Flame className="h-3 w-3" />
                    Hot Deal
                  </Badge>
                )}

                {/* Days Left Badge */}
                {promo.daysLeft <= 15 && (
                  <Badge className="absolute left-4 bottom-4 bg-red-500 text-white border-0 gap-1">
                    <Clock className="h-3 w-3" />
                    Últimos {promo.daysLeft} días
                  </Badge>
                )}

                <div className="absolute right-4 bottom-4">
                  <WishlistButton itemId={promo.id} itemName={promo.name} variant="icon" />
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{promo.destination}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {promo.type}
                  </Badge>
                </div>

                <h3 className="mb-2 text-xl font-bold">{promo.name}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">{promo.description}</p>

                {/* Validity Period */}
                <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Válido hasta el{" "}
                    {new Date(promo.validUntil).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Pricing */}
                <div className="mb-4 border-t pt-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-lg text-muted-foreground line-through">
                      ${promo.originalPrice.toLocaleString()}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                    >
                      Ahorras ${promo.savings}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#E91E63]">${promo.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">o {promo.miles.toLocaleString()} millas</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#E91E63] hover:bg-[#E91E63]/90">
                    Reservar Ahora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
