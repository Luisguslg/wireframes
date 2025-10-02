"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plane, Hotel, Ship, Car, MapPin, Calendar, Trash2, Save, Download, ArrowRight, DollarSign } from "lucide-react"

interface ItineraryItem {
  id: string
  type: "flight" | "hotel" | "cruise" | "transfer" | "tour"
  title: string
  location: string
  date: string
  duration: string
  price: number
}

export function ItineraryBuilder() {
  const [itineraryName, setItineraryName] = useState("Mi Viaje Personalizado")
  const [items, setItems] = useState<ItineraryItem[]>([
    {
      id: "1",
      type: "flight",
      title: "Vuelo Caracas → Cancún",
      location: "Cancún, México",
      date: "2025-03-15",
      duration: "3h 30min",
      price: 450,
    },
  ])

  const addItem = (type: ItineraryItem["type"]) => {
    const newItem: ItineraryItem = {
      id: Date.now().toString(),
      type,
      title: `Nuevo ${type}`,
      location: "",
      date: "",
      duration: "",
      price: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  const getIcon = (type: ItineraryItem["type"]) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5" />
      case "hotel":
        return <Hotel className="h-5 w-5" />
      case "cruise":
        return <Ship className="h-5 w-5" />
      case "transfer":
        return <Car className="h-5 w-5" />
      case "tour":
        return <MapPin className="h-5 w-5" />
    }
  }

  const getTypeLabel = (type: ItineraryItem["type"]) => {
    const labels = {
      flight: "Vuelo",
      hotel: "Hotel",
      cruise: "Crucero",
      transfer: "Traslado",
      tour: "Tour",
    }
    return labels[type]
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Constructor de Itinerarios</h1>
          <p className="text-white/90 text-lg">Diseña tu viaje perfecto paso a paso</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Main Builder */}
          <div className="lg:col-span-8 space-y-6">
            {/* Itinerary Name */}
            <Card>
              <CardHeader>
                <CardTitle>Nombre del itinerario</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={itineraryName}
                  onChange={(e) => setItineraryName(e.target.value)}
                  className="text-lg font-semibold"
                  placeholder="Ej: Vacaciones en el Caribe 2025"
                />
              </CardContent>
            </Card>

            {/* Add Service Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Agregar servicios</CardTitle>
                <CardDescription>Construye tu itinerario seleccionando los servicios que necesitas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => addItem("flight")}
                  >
                    <Plane className="h-6 w-6 text-[#E91E63]" />
                    <span className="text-sm">Vuelo</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => addItem("hotel")}
                  >
                    <Hotel className="h-6 w-6 text-[#E91E63]" />
                    <span className="text-sm">Hotel</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => addItem("cruise")}
                  >
                    <Ship className="h-6 w-6 text-[#E91E63]" />
                    <span className="text-sm">Crucero</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => addItem("transfer")}
                  >
                    <Car className="h-6 w-6 text-[#E91E63]" />
                    <span className="text-sm">Traslado</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex-col gap-2 bg-transparent"
                    onClick={() => addItem("tour")}
                  >
                    <MapPin className="h-6 w-6 text-[#E91E63]" />
                    <span className="text-sm">Tour</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Línea de tiempo del viaje</CardTitle>
                <CardDescription>Organiza cronológicamente cada etapa de tu viaje</CardDescription>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No hay servicios agregados aún</p>
                    <p className="text-sm">Comienza agregando vuelos, hoteles o tours</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex gap-4">
                          {/* Timeline indicator */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-[#E91E63] text-white flex items-center justify-center">
                              {getIcon(item.type)}
                            </div>
                            {index < items.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-700 my-2" />
                            )}
                          </div>

                          {/* Item details */}
                          <Card className="flex-1">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <Badge variant="secondary" className="mb-2">
                                    {getTypeLabel(item.type)}
                                  </Badge>
                                  <Input
                                    value={item.title}
                                    onChange={(e) => {
                                      const newItems = [...items]
                                      newItems[index].title = e.target.value
                                      setItems(newItems)
                                    }}
                                    className="font-semibold mb-2"
                                  />
                                </div>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-destructive"
                                  onClick={() => removeItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid gap-3 md:grid-cols-2">
                                <div className="space-y-2">
                                  <Label className="text-xs">Ubicación</Label>
                                  <Input
                                    placeholder="Ciudad, país"
                                    value={item.location}
                                    onChange={(e) => {
                                      const newItems = [...items]
                                      newItems[index].location = e.target.value
                                      setItems(newItems)
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Fecha</Label>
                                  <Input
                                    type="date"
                                    value={item.date}
                                    onChange={(e) => {
                                      const newItems = [...items]
                                      newItems[index].date = e.target.value
                                      setItems(newItems)
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Duración</Label>
                                  <Input
                                    placeholder="Ej: 3 noches, 2 horas"
                                    value={item.duration}
                                    onChange={(e) => {
                                      const newItems = [...items]
                                      newItems[index].duration = e.target.value
                                      setItems(newItems)
                                    }}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs">Precio (USD)</Label>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={item.price || ""}
                                    onChange={(e) => {
                                      const newItems = [...items]
                                      newItems[index].price = Number(e.target.value)
                                      setItems(newItems)
                                    }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 space-y-4">
              {/* Price Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#E91E63]" />
                    Resumen de costos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{getTypeLabel(item.type)}</span>
                        <span className="font-medium">${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-2xl text-[#E91E63]">${totalPrice}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Precio estimado por persona</p>
                </CardContent>
              </Card>

              {/* Trip Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalles del viaje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Servicios:</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Destinos:</span>
                    <span className="font-medium">{new Set(items.map((i) => i.location).filter(Boolean)).size}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90 h-12">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Cotizar itinerario
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar borrador
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </CardContent>
              </Card>

              {/* Help */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-3">¿Necesitas ayuda para planificar tu viaje?</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
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
