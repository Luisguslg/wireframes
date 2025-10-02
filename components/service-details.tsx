"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Star,
  MapPin,
  CalendarIcon,
  CheckCircle2,
  XCircle,
  Shield,
  Clock,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Plus,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"

export function ServiceDetails() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [passengers, setPassengers] = useState("2")
  const [roomType, setRoomType] = useState("double")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock data - would come from API/database
  const service = {
    id: 1,
    title: "Paquete Todo Incluido - Punta Cana",
    destination: "Punta Cana, República Dominicana",
    price: 2450,
    originalPrice: 2890,
    duration: "7 noches / 8 días",
    rating: 4.8,
    reviews: 234,
    images: ["beach-resort-1", "beach-resort-2", "beach-resort-3", "beach-resort-4"],
    description:
      "Disfruta de unas vacaciones inolvidables en uno de los destinos más paradisíacos del Caribe. Este paquete todo incluido te ofrece la experiencia perfecta para relajarte y disfrutar con tu familia o pareja.",
    highlights: [
      "Resort 5 estrellas frente al mar",
      "Todas las comidas y bebidas incluidas",
      "Actividades acuáticas ilimitadas",
      "Entretenimiento nocturno en vivo",
      "Spa y gimnasio de cortesía",
      "Club infantil supervisado",
    ],
    includes: [
      "Vuelo redondo desde Caracas",
      "Traslados aeropuerto-hotel-aeropuerto",
      "7 noches de alojamiento",
      "Régimen todo incluido (comidas, bebidas, snacks)",
      "Acceso a todas las instalaciones del resort",
      "Impuestos y tasas aeroportuarias",
    ],
    notIncludes: ["Seguro de viaje (opcional)", "Excursiones adicionales", "Propinas", "Gastos personales"],
    itinerary: [
      {
        day: 1,
        title: "Llegada a Punta Cana",
        description: "Recepción en el aeropuerto y traslado al resort. Check-in y bienvenida con cóctel tropical.",
      },
      {
        day: 2,
        title: "Día libre en el resort",
        description: "Disfruta de las playas, piscinas y actividades del resort. Cena buffet internacional.",
      },
      {
        day: 3,
        title: "Excursión opcional",
        description: "Día libre o excursión opcional a Isla Saona (no incluida).",
      },
      {
        day: 4,
        title: "Actividades acuáticas",
        description: "Snorkel, kayak, paddle board y más actividades incluidas.",
      },
      {
        day: 5,
        title: "Día de spa y relax",
        description: "Disfruta del spa, masajes y tratamientos (algunos con costo adicional).",
      },
      { day: 6, title: "Noche temática", description: "Cena especial y show en vivo. Fiesta en la playa." },
      {
        day: 7,
        title: "Último día completo",
        description: "Aprovecha tu último día para disfrutar de todas las instalaciones.",
      },
      {
        day: 8,
        title: "Regreso a casa",
        description: "Check-out y traslado al aeropuerto. Vuelo de regreso a Caracas.",
      },
    ],
    reviews: [
      {
        id: 1,
        author: "María González",
        rating: 5,
        date: "Hace 2 semanas",
        comment:
          "Experiencia increíble! El resort superó todas nuestras expectativas. La comida excelente y el personal muy amable.",
        helpful: 12,
      },
      {
        id: 2,
        author: "Carlos Ramírez",
        rating: 4,
        date: "Hace 1 mes",
        comment:
          "Muy buen paquete, relación calidad-precio excelente. Las playas son hermosas y el servicio impecable.",
        helpful: 8,
      },
      {
        id: 3,
        author: "Ana Martínez",
        rating: 5,
        date: "Hace 2 meses",
        comment:
          "Perfecto para familias! Los niños se divirtieron muchísimo en el club infantil y nosotros pudimos relajarnos.",
        helpful: 15,
      },
    ],
    cancellationPolicy:
      "Cancelación gratuita hasta 30 días antes del viaje. Entre 30-15 días: 50% de penalización. Menos de 15 días: no reembolsable.",
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length)
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#E91E63]">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/buscar" className="hover:text-[#E91E63]">
              Búsqueda
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="h-96 bg-gradient-to-br from-[#E91E63]/20 to-[#C2185B]/20 flex items-center justify-center">
                  <span className="text-muted-foreground">Imagen del resort {currentImageIndex + 1}</span>
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {service.destination}
                  </p>
                </div>
                {service.originalPrice > service.price && (
                  <Badge className="bg-green-500 text-white">Ahorra ${service.originalPrice - service.price}</Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(service.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{service.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({service.reviews.length} reseñas)</span>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {service.duration}
                </Badge>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Descripción</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerario</TabsTrigger>
                <TabsTrigger value="includes">Incluye</TabsTrigger>
                <TabsTrigger value="reviews">Reseñas</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre este paquete</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                    <div>
                      <h3 className="font-semibold mb-3">Lo más destacado</h3>
                      <div className="grid gap-2 md:grid-cols-2">
                        {service.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#E91E63] shrink-0 mt-0.5" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Itinerario día a día</CardTitle>
                    <CardDescription>Conoce qué harás cada día de tu viaje</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {service.itinerary.map((day, index) => (
                        <div key={day.day} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#E91E63] text-white flex items-center justify-center font-semibold">
                              {day.day}
                            </div>
                            {index < service.itinerary.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 my-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <h4 className="font-semibold mb-1">{day.title}</h4>
                            <p className="text-sm text-muted-foreground">{day.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="includes" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        Incluye
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.includes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <XCircle className="h-5 w-5" />
                        No incluye
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.notIncludes.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Shield className="h-5 w-5" />
                      Política de cancelación
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{service.cancellationPolicy}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Reseñas de clientes</CardTitle>
                        <CardDescription>{service.reviews.length} opiniones verificadas</CardDescription>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#E91E63]">{service.rating}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(service.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {service.reviews.map((review) => (
                      <div key={review.id}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-sm text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                        <Button variant="ghost" size="sm" className="text-xs">
                          👍 Útil ({review.helpful})
                        </Button>
                        {review.id !== service.reviews[service.reviews.length - 1].id && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <div className="flex items-baseline gap-2">
                    {service.originalPrice > service.price && (
                      <span className="text-lg text-muted-foreground line-through">${service.originalPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-[#E91E63]">${service.price}</span>
                    <span className="text-sm text-muted-foreground">por persona</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Fecha de salida</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Selecciona una fecha"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Passengers */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Número de pasajeros</Label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 pasajero</SelectItem>
                        <SelectItem value="2">2 pasajeros</SelectItem>
                        <SelectItem value="3">3 pasajeros</SelectItem>
                        <SelectItem value="4">4 pasajeros</SelectItem>
                        <SelectItem value="5">5+ pasajeros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Room Type */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo de habitación</Label>
                    <Select value={roomType} onValueChange={setRoomType}>
                      <SelectTrigger className="bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Individual</SelectItem>
                        <SelectItem value="double">Doble</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                        <SelectItem value="family">Familiar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Precio base ({passengers} persona{passengers !== "1" ? "s" : ""})
                      </span>
                      <span className="font-medium">${service.price * Number.parseInt(passengers)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Impuestos y tasas</span>
                      <span className="font-medium">Incluido</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-[#E91E63]">
                        ${service.price * Number.parseInt(passengers)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button asChild className="w-full h-12 bg-[#E91E63] hover:bg-[#E91E63]/90">
                      <Link href="/carrito">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Reservar ahora
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-12 bg-transparent">
                      <Link href="/itinerario">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar al itinerario
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full">
                      Solicitar cotización
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Pago 100% seguro</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>Confirmación inmediata</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Cancelación flexible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="mt-4 bg-gradient-to-br from-[#E91E63]/10 to-[#C2185B]/10">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">¿Necesitas ayuda para reservar?</p>
                  <Button variant="outline" className="w-full bg-background">
                    Contactar asesor
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
