"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Star, Check, XIcon, Calendar, MapPin, ArrowLeft, ShoppingCart, Route } from "lucide-react"
import Link from "next/link"

interface ComparisonItem {
  id: string
  type: "package" | "service"
  name: string
  image: string
  destination: string
  price: number
  currency: string
  duration: string
  dates: string
  rating: number
  reviews: number
  includes: string[]
  excludes: string[]
  policies: {
    cancellation: string
    changes: string
    payment: string
  }
}

interface OfferComparatorProps {
  items?: ComparisonItem[]
  onRemoveItem?: (id: string) => void
  onAddToItinerary?: (id: string) => void
  onBookNow?: (id: string) => void
}

export function OfferComparator({ items = [], onRemoveItem, onAddToItinerary, onBookNow }: OfferComparatorProps) {
  const [comparisonItems, setComparisonItems] = useState<ComparisonItem[]>(
    items.length > 0
      ? items
      : [
          {
            id: "1",
            type: "package",
            name: "Paquete Caribe Todo Incluido",
            image: "/cancun-beach-resort.png",
            destination: "Cancún, México",
            price: 899,
            currency: "USD",
            duration: "7 días / 6 noches",
            dates: "15 Jun - 22 Jun 2025",
            rating: 4.8,
            reviews: 342,
            includes: [
              "Vuelo ida y vuelta",
              "Hotel 5 estrellas todo incluido",
              "Traslados aeropuerto-hotel",
              "Seguro de viaje",
              "Impuestos incluidos",
            ],
            excludes: ["Excursiones opcionales", "Propinas", "Gastos personales"],
            policies: {
              cancellation: "Cancelación gratuita hasta 15 días antes",
              changes: "Cambios permitidos con cargo de $50",
              payment: "Pago inicial 30%, resto 15 días antes",
            },
          },
          {
            id: "2",
            type: "package",
            name: "Europa Mágica Premium",
            image: "/eiffel-tower-paris.png",
            destination: "París, Roma, Barcelona",
            price: 1499,
            currency: "USD",
            duration: "10 días / 9 noches",
            dates: "20 Jul - 30 Jul 2025",
            rating: 4.9,
            reviews: 567,
            includes: [
              "Vuelos internacionales",
              "Hoteles 4 estrellas con desayuno",
              "Traslados entre ciudades",
              "Tours guiados en cada ciudad",
              "Seguro de viaje premium",
            ],
            excludes: ["Almuerzos y cenas", "Entradas a museos", "Propinas"],
            policies: {
              cancellation: "Cancelación con cargo del 20% hasta 30 días antes",
              changes: "Cambios permitidos hasta 45 días antes",
              payment: "Pago inicial 40%, resto 30 días antes",
            },
          },
          {
            id: "3",
            type: "package",
            name: "Crucero Mediterráneo Luxury",
            image: "/luxury-cruise-ship-mediterranean.jpg",
            destination: "Mediterráneo",
            price: 1299,
            currency: "USD",
            duration: "8 días / 7 noches",
            dates: "10 Ago - 18 Ago 2025",
            rating: 4.7,
            reviews: 289,
            includes: [
              "Vuelo a puerto de embarque",
              "Cabina con balcón",
              "Todas las comidas a bordo",
              "Entretenimiento y actividades",
              "Seguro de crucero",
            ],
            excludes: ["Bebidas alcohólicas premium", "Excursiones en puertos", "Spa y servicios especiales"],
            policies: {
              cancellation: "Cancelación con cargo del 30% hasta 60 días antes",
              changes: "Cambios no permitidos después de confirmación",
              payment: "Pago completo al momento de reservar",
            },
          },
        ],
  )

  const handleRemove = (id: string) => {
    setComparisonItems(comparisonItems.filter((item) => item.id !== id))
    onRemoveItem?.(id)
  }

  const handleAddToItinerary = (id: string) => {
    onAddToItinerary?.(id)
  }

  const handleBookNow = (id: string) => {
    onBookNow?.(id)
  }

  if (comparisonItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Route className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No hay ofertas para comparar</h3>
          <p className="mb-6 text-muted-foreground">
            Agrega ofertas desde los resultados de búsqueda o desde el detalle de cada paquete
          </p>
          <Button asChild>
            <Link href="/buscar">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a Resultados
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Comparador de Ofertas</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Comparando {comparisonItems.length} {comparisonItems.length === 1 ? "oferta" : "ofertas"}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/buscar">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Resultados
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full gap-4 pb-4">
            {comparisonItems.map((item) => (
              <Card key={item.id} className="w-80 shrink-0">
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-48 w-full object-cover" />
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => handleRemove(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Badge className="absolute bottom-2 left-2 bg-background/90 text-foreground">
                    {item.type === "package" ? "Paquete" : "Servicio"}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold leading-tight">{item.name}</h3>
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{item.destination}</span>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({item.reviews} reseñas)</span>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-primary">
                      ${item.price}
                      <span className="text-sm font-normal text-muted-foreground"> {item.currency}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.dates}</div>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <Check className="h-4 w-4 text-green-600" />
                      Incluye
                    </h4>
                    <ul className="space-y-2">
                      {item.includes.map((include, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-4">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <XIcon className="h-4 w-4 text-red-600" />
                      No Incluye
                    </h4>
                    <ul className="space-y-2">
                      {item.excludes.map((exclude, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                          <span>{exclude}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  <div className="mb-6">
                    <h4 className="mb-3 font-semibold">Políticas</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium">Cancelación:</span>
                        <p className="mt-1 text-muted-foreground">{item.policies.cancellation}</p>
                      </div>
                      <div>
                        <span className="font-medium">Cambios:</span>
                        <p className="mt-1 text-muted-foreground">{item.policies.changes}</p>
                      </div>
                      <div>
                        <span className="font-medium">Pago:</span>
                        <p className="mt-1 text-muted-foreground">{item.policies.payment}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90"
                      onClick={() => handleBookNow(item.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Reservar Ahora
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleAddToItinerary(item.id)}
                    >
                      <Route className="mr-2 h-4 w-4" />
                      Agregar al Itinerario
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {comparisonItems.length < 4 && (
          <Card className="mt-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">¿Quieres comparar más ofertas?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Puedes agregar hasta {4 - comparisonItems.length} ofertas más
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/buscar">Buscar Más Ofertas</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
