"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Heart,
  MapPin,
  Calendar,
  TrendingDown,
  TrendingUp,
  Bell,
  ShoppingCart,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

interface WishlistItem {
  id: string
  name: string
  type: "package" | "service"
  destination: string
  image: string
  currentPrice: number
  previousPrice: number
  currency: string
  priceChange: number
  priceChangePercent: number
  duration: string
  rating: number
  reviews: number
  addedDate: string
  priceAlert: {
    enabled: boolean
    targetPrice: number
  }
}

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: "Paquete Caribe Todo Incluido",
      type: "package",
      destination: "Cancún, México",
      image: "/cancun-beach-resort.png",
      currentPrice: 899,
      previousPrice: 1099,
      currency: "USD",
      priceChange: -200,
      priceChangePercent: -18.2,
      duration: "7 días / 6 noches",
      rating: 4.8,
      reviews: 342,
      addedDate: "2025-01-15",
      priceAlert: {
        enabled: true,
        targetPrice: 850,
      },
    },
    {
      id: "2",
      name: "Europa Mágica Premium",
      type: "package",
      destination: "París, Roma, Barcelona",
      image: "/eiffel-tower-paris.png",
      currentPrice: 1499,
      previousPrice: 1450,
      currency: "USD",
      priceChange: 49,
      priceChangePercent: 3.4,
      duration: "10 días / 9 noches",
      rating: 4.9,
      reviews: 567,
      addedDate: "2025-01-10",
      priceAlert: {
        enabled: false,
        targetPrice: 1400,
      },
    },
    {
      id: "3",
      name: "Tour Machu Picchu",
      type: "service",
      destination: "Cusco, Perú",
      image: "/machu-picchu-peru.png",
      currentPrice: 650,
      previousPrice: 650,
      currency: "USD",
      priceChange: 0,
      priceChangePercent: 0,
      duration: "5 días / 4 noches",
      rating: 4.9,
      reviews: 423,
      addedDate: "2025-01-20",
      priceAlert: {
        enabled: true,
        targetPrice: 600,
      },
    },
  ])

  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<WishlistItem | null>(null)

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const handleToggleAlert = (id: string) => {
    setWishlistItems(
      wishlistItems.map((item) =>
        item.id === id ? { ...item, priceAlert: { ...item.priceAlert, enabled: !item.priceAlert.enabled } } : item,
      ),
    )
  }

  const handleUpdateTargetPrice = (id: string, targetPrice: number) => {
    setWishlistItems(
      wishlistItems.map((item) =>
        item.id === id ? { ...item, priceAlert: { ...item.priceAlert, targetPrice } } : item,
      ),
    )
  }

  const openAlertDialog = (item: WishlistItem) => {
    setSelectedItem(item)
    setAlertDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="py-16">
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Tu lista de deseos está vacía</h3>
          <p className="mb-6 text-muted-foreground">
            Guarda tus paquetes y servicios favoritos para consultarlos más tarde
          </p>
          <Button asChild className="bg-[#E91E63] hover:bg-[#E91E63]/90">
            <Link href="/buscar">
              Explorar Ofertas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Mi Lista de Deseos</h2>
        <p className="mt-2 text-muted-foreground">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item guardado" : "items guardados"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden">
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-48 w-full object-cover" />
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-2 top-2 h-9 w-9 bg-white/90 hover:bg-white"
                onClick={() => handleRemoveItem(item.id)}
              >
                <Heart className="h-5 w-5 fill-[#E91E63] text-[#E91E63]" />
              </Button>
              <Badge className="absolute bottom-2 left-2 bg-background/90 text-foreground">
                {item.type === "package" ? "Paquete" : "Servicio"}
              </Badge>
            </div>

            <div className="p-5">
              <h3 className="mb-2 text-lg font-bold leading-tight">{item.name}</h3>
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{item.destination}</span>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">
                      ${item.currentPrice}
                      <span className="text-sm font-normal text-muted-foreground"> {item.currency}</span>
                    </span>
                  </div>
                  {item.priceChange !== 0 && (
                    <div className="mt-1 flex items-center gap-1 text-sm">
                      {item.priceChange < 0 ? (
                        <>
                          <TrendingDown className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">
                            {Math.abs(item.priceChangePercent).toFixed(1)}% menos
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-600">{item.priceChangePercent.toFixed(1)}% más</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{item.duration}</span>
              </div>

              <div className="mb-4 rounded-lg border bg-muted/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <Label htmlFor={`alert-${item.id}`} className="flex items-center gap-2 text-sm font-medium">
                    <Bell className="h-4 w-4" />
                    Alerta de precio
                  </Label>
                  <Switch
                    id={`alert-${item.id}`}
                    checked={item.priceAlert.enabled}
                    onCheckedChange={() => handleToggleAlert(item.id)}
                  />
                </div>
                {item.priceAlert.enabled && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground">
                      Te notificaremos cuando el precio baje a ${item.priceAlert.targetPrice} {item.currency}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => openAlertDialog(item)}
                    >
                      Cambiar precio objetivo
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button asChild className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90">
                  <Link href={`/paquetes/${item.id}`}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Reservar Ahora
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={`/cotizar?item=${item.id}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Solicitar Cotización
                  </Link>
                </Button>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">Agregado el {formatDate(item.addedDate)}</p>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Alerta de Precio</DialogTitle>
            <DialogDescription>
              Te enviaremos un email cuando el precio de "{selectedItem?.name}" alcance tu precio objetivo
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="target-price">Precio objetivo ({selectedItem?.currency})</Label>
              <Input
                id="target-price"
                type="number"
                defaultValue={selectedItem?.priceAlert.targetPrice}
                onChange={(e) => {
                  if (selectedItem) {
                    handleUpdateTargetPrice(selectedItem.id, Number(e.target.value))
                  }
                }}
              />
              <p className="text-sm text-muted-foreground">
                Precio actual: ${selectedItem?.currentPrice} {selectedItem?.currency}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setAlertDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90" onClick={() => setAlertDialogOpen(false)}>
              Guardar Alerta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
