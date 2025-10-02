"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CarbonOffsetCard } from "@/components/carbon-offset-card"
import { ShoppingCart, CreditCard } from "lucide-react"

interface CartItem {
  id: string
  name: string
  type: string
  price: number
  carbonKg: number
}

export function CartSummary() {
  const [offsetEnabled, setOffsetEnabled] = useState(false)
  const [offsetAmount, setOffsetAmount] = useState(0)

  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Paquete Caribe Todo Incluido",
      type: "Paquete",
      price: 899,
      carbonKg: 850,
    },
    {
      id: "2",
      name: "Seguro de Viaje Premium",
      type: "Servicio",
      price: 45,
      carbonKg: 0,
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const taxes = subtotal * 0.16
  const totalCarbonKg = cartItems.reduce((sum, item) => sum + item.carbonKg, 0)
  const total = subtotal + taxes + offsetAmount

  const handleOffsetToggle = (enabled: boolean, amount: number) => {
    setOffsetEnabled(enabled)
    setOffsetAmount(amount)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Resumen de Compra
        </h2>

        <div className="space-y-3 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.type}</div>
              </div>
              <div className="font-semibold">${item.price}</div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Impuestos (16%)</span>
            <span className="font-medium">${taxes.toFixed(2)}</span>
          </div>
          {offsetEnabled && (
            <div className="flex justify-between text-green-700">
              <span>Compensación de carbono</span>
              <span className="font-medium">${offsetAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)} USD</span>
        </div>

        <Button className="w-full mt-6 bg-[#E91E63] hover:bg-[#E91E63]/90">
          <CreditCard className="mr-2 h-4 w-4" />
          Proceder al Pago
        </Button>
      </Card>

      <CarbonOffsetCard totalCarbonKg={totalCarbonKg} onToggleOffset={handleOffsetToggle} />
    </div>
  )
}
