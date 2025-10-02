"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trash2,
  MapPin,
  Calendar,
  Users,
  Plane,
  Hotel,
  Ship,
  CreditCard,
  Shield,
  CheckCircle2,
  Wallet,
  Bitcoin,
  Award,
} from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  type: "flight" | "hotel" | "cruise" | "package"
  title: string
  destination: string
  date: string
  passengers: number
  price: number
  image: string
}

export function CartCheckout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      type: "package",
      title: "Paquete Todo Incluido - Punta Cana",
      destination: "Punta Cana, República Dominicana",
      date: "15 Mar 2025",
      passengers: 2,
      price: 2450,
      image: "beach-resort",
    },
    {
      id: "2",
      type: "hotel",
      title: "Hotel Boutique - Cartagena",
      destination: "Cartagena, Colombia",
      date: "22 Mar 2025",
      passengers: 2,
      price: 890,
      image: "hotel",
    },
  ])

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [installments, setInstallments] = useState("1")
  const [useMiles, setUseMiles] = useState(false)
  const [milesAmount, setMilesAmount] = useState("0")

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.passengers, 0)
  const taxes = subtotal * 0.12 // 12% tax
  const milesDiscount = useMiles ? Number.parseInt(milesAmount) * 0.01 : 0 // 1 cent per mile
  const total = subtotal + taxes - milesDiscount

  const getIcon = (type: CartItem["type"]) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5" />
      case "hotel":
        return <Hotel className="h-5 w-5" />
      case "cruise":
        return <Ship className="h-5 w-5" />
      case "package":
        return <MapPin className="h-5 w-5" />
    }
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Carrito de Reservas</h1>
          <p className="text-white/90">Revisa tu selección y completa tu reserva</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
              <p className="text-muted-foreground mb-6">Comienza a explorar nuestros destinos y paquetes</p>
              <Button asChild className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                <Link href="/buscar">Explorar destinos</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Cart Items */}
            <div className="lg:col-span-7 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Servicios seleccionados ({cartItems.length})</CardTitle>
                  <CardDescription>Revisa los detalles de tu reserva</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[#E91E63]/20 to-[#C2185B]/20 flex items-center justify-center shrink-0">
                          {getIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3" />
                                {item.destination}
                              </p>
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
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {item.passengers} pasajero{item.passengers > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">
                              {item.type === "package"
                                ? "Paquete"
                                : item.type === "hotel"
                                  ? "Hotel"
                                  : item.type === "flight"
                                    ? "Vuelo"
                                    : "Crucero"}
                            </Badge>
                            <span className="text-lg font-bold text-[#E91E63]">${item.price * item.passengers}</span>
                          </div>
                        </div>
                      </div>
                      {item.id !== cartItems[cartItems.length - 1].id && <Separator className="mt-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de pago</CardTitle>
                  <CardDescription>Selecciona cómo deseas pagar tu reserva</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      {/* Credit/Debit Card */}
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                        <RadioGroupItem value="credit-card" />
                        <CreditCard className="h-5 w-5 text-[#E91E63]" />
                        <div className="flex-1">
                          <p className="font-medium">Tarjeta de crédito/débito</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                        </div>
                      </label>

                      {/* Zelle */}
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                        <RadioGroupItem value="zelle" />
                        <Wallet className="h-5 w-5 text-[#E91E63]" />
                        <div className="flex-1">
                          <p className="font-medium">Zelle</p>
                          <p className="text-sm text-muted-foreground">Transferencia instantánea</p>
                        </div>
                      </label>

                      {/* PayPal */}
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                        <RadioGroupItem value="paypal" />
                        <Wallet className="h-5 w-5 text-[#E91E63]" />
                        <div className="flex-1">
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-muted-foreground">Pago seguro con PayPal</p>
                        </div>
                      </label>

                      {/* Crypto */}
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                        <RadioGroupItem value="crypto" />
                        <Bitcoin className="h-5 w-5 text-[#E91E63]" />
                        <div className="flex-1">
                          <p className="font-medium">Criptomonedas</p>
                          <p className="text-sm text-muted-foreground">BTC, USDT, ETH</p>
                        </div>
                      </label>

                      {/* Bank Transfer */}
                      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                        <RadioGroupItem value="bank-transfer" />
                        <Wallet className="h-5 w-5 text-[#E91E63]" />
                        <div className="flex-1">
                          <p className="font-medium">Transferencia bancaria</p>
                          <p className="text-sm text-muted-foreground">Pago móvil o transferencia</p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>

                  {/* Credit Card Form */}
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2 space-y-2">
                          <Label>Número de tarjeta</Label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="space-y-2">
                          <Label>Fecha de vencimiento</Label>
                          <Input placeholder="MM/AA" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input placeholder="123" type="password" maxLength={4} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label>Nombre en la tarjeta</Label>
                          <Input placeholder="Como aparece en la tarjeta" />
                        </div>
                      </div>

                      {/* Installments */}
                      <div className="space-y-2">
                        <Label>Cuotas</Label>
                        <Select value={installments} onValueChange={setInstallments}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 pago (sin intereses)</SelectItem>
                            <SelectItem value="3">3 cuotas (3% interés)</SelectItem>
                            <SelectItem value="6">6 cuotas (6% interés)</SelectItem>
                            <SelectItem value="12">12 cuotas (12% interés)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Combine Payment Methods */}
                  <div className="pt-4 border-t">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox />
                      <span className="text-sm">Combinar con otro método de pago</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Frequent Flyer Miles */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    Millas de viajero frecuente
                  </CardTitle>
                  <CardDescription>Usa tus millas para reducir el costo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Millas disponibles:</span>
                    <span className="font-semibold">15,420 millas</span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={useMiles} onCheckedChange={(checked) => setUseMiles(checked as boolean)} />
                    <span className="text-sm">Usar millas en esta reserva</span>
                  </label>
                  {useMiles && (
                    <div className="space-y-2">
                      <Label>Cantidad de millas a usar</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        max="15420"
                        value={milesAmount}
                        onChange={(e) => setMilesAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">1 milla = $0.01 USD. Descuento máximo: $154.20</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-5">
              <div className="sticky top-4 space-y-4">
                {/* Price Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de la reserva</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Impuestos y tasas (12%)</span>
                        <span className="font-medium">${taxes.toFixed(2)}</span>
                      </div>
                      {useMiles && milesDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Descuento por millas</span>
                          <span className="font-medium">-${milesDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total a pagar</span>
                        <span className="text-3xl font-bold text-[#E91E63]">${total.toFixed(2)}</span>
                      </div>
                      {installments !== "1" && (
                        <p className="text-xs text-muted-foreground">
                          {installments} cuotas de ${(total / Number.parseInt(installments)).toFixed(2)}
                        </p>
                      )}
                    </div>

                    <Separator />

                    {/* Confirm Button */}
                    <Button className="w-full h-12 bg-[#E91E63] hover:bg-[#E91E63]/90 text-lg">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Confirmar y pagar
                    </Button>

                    {/* Trust Messages */}
                    <div className="space-y-2 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span>Tus datos están protegidos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Transacción 100% segura</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Confirmación inmediata</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Traveler Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Información de pasajeros</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label>Pasajero principal</Label>
                      <Input placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="tu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input type="tel" placeholder="+58 412 123 4567" />
                    </div>
                    <label className="flex items-start gap-2 cursor-pointer text-sm">
                      <Checkbox className="mt-0.5" />
                      <span className="text-muted-foreground">
                        Acepto los términos y condiciones y la política de privacidad
                      </span>
                    </label>
                  </CardContent>
                </Card>

                {/* Help */}
                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-3">¿Necesitas ayuda con tu reserva?</p>
                    <Button variant="outline" size="sm" className="w-full bg-background">
                      Contactar soporte
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
