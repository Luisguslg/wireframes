"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, Eye, Printer, Save, FileText } from "lucide-react"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  tax: number
}

export function InvoiceGenerator() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", description: "", quantity: 1, unitPrice: 0, discount: 0, tax: 16 },
  ])
  const [currency, setCurrency] = useState("USD")
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])
  const [showPreview, setShowPreview] = useState(false)

  const generateInvoiceNumber = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0")
    return `INV-${year}${month}-${random}`
  }

  const [invoiceNumber] = useState(generateInvoiceNumber())

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: "", quantity: 1, unitPrice: 0, discount: 0, tax: 16 },
    ])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateItemTotal = (item: InvoiceItem) => {
    const subtotal = item.quantity * item.unitPrice
    const discountAmount = subtotal * (item.discount / 100)
    const afterDiscount = subtotal - discountAmount
    const taxAmount = afterDiscount * (item.tax / 100)
    return afterDiscount + taxAmount
  }

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    const totalDiscount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice * (item.discount / 100), 0)
    const afterDiscount = subtotal - totalDiscount
    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice
      const itemDiscount = itemSubtotal * (item.discount / 100)
      return sum + (itemSubtotal - itemDiscount) * (item.tax / 100)
    }, 0)
    const total = afterDiscount + totalTax

    return { subtotal, totalDiscount, totalTax, total }
  }

  const totals = calculateTotals()

  const togglePaymentMethod = (method: string) => {
    setPaymentMethods((prev) => (prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]))
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSaveDraft = () => {
    alert("Borrador guardado exitosamente (mock)")
  }

  if (showPreview) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 print:hidden">
          <Button onClick={() => setShowPreview(false)} variant="outline">
            Volver a Editar
          </Button>
          <Button onClick={handlePrint} className="bg-[#E91E63] hover:bg-[#E91E63]/90">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir / Exportar
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-12">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#E91E63] mb-2">FACTURA</h1>
                <p className="text-sm text-muted-foreground">Número: {invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">ViajesUCAB</p>
                <p className="text-sm text-muted-foreground">RIF: J-12345678-9</p>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b">
              <div>
                <h3 className="font-semibold mb-2">Emisor</h3>
                <p className="text-sm">ViajesUCAB C.A.</p>
                <p className="text-sm text-muted-foreground">Av. Principal, Caracas</p>
                <p className="text-sm text-muted-foreground">contacto@viajesucab.com</p>
                <p className="text-sm text-muted-foreground">+58 212 555-0100</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cliente</h3>
                <p className="text-sm">Cliente de Ejemplo</p>
                <p className="text-sm text-muted-foreground">V-12345678</p>
                <p className="text-sm text-muted-foreground">cliente@email.com</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-semibold">Descripción</th>
                  <th className="text-right py-2 text-sm font-semibold">Cant.</th>
                  <th className="text-right py-2 text-sm font-semibold">Precio Unit.</th>
                  <th className="text-right py-2 text-sm font-semibold">Desc.</th>
                  <th className="text-right py-2 text-sm font-semibold">Impuesto</th>
                  <th className="text-right py-2 text-sm font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 text-sm">{item.description || "Sin descripción"}</td>
                    <td className="text-right text-sm">{item.quantity}</td>
                    <td className="text-right text-sm">
                      {currency} {item.unitPrice.toFixed(2)}
                    </td>
                    <td className="text-right text-sm">{item.discount}%</td>
                    <td className="text-right text-sm">{item.tax}%</td>
                    <td className="text-right text-sm font-semibold">
                      {currency} {calculateItemTotal(item).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>
                    {currency} {totals.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-red-600">
                  <span>Descuentos:</span>
                  <span>
                    -{currency} {totals.totalDiscount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Impuestos:</span>
                  <span>
                    {currency} {totals.totalTax.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-[#E91E63]">
                    {currency} {totals.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Métodos de Pago</h3>
                <p className="text-sm text-muted-foreground">{paymentMethods.join(", ")}</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground pt-8 border-t">
              <p>Gracias por su preferencia</p>
              <p>ViajesUCAB - Tu Agencia de Confianza</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#E91E63]" />
          Nueva Factura
        </CardTitle>
        <CardDescription>Completa los datos para generar la factura</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Invoice Info */}
        <div className="grid md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <Label className="text-xs text-muted-foreground">Número de Factura</Label>
            <p className="font-mono font-semibold">{invoiceNumber}</p>
          </div>
          <div>
            <Label htmlFor="issue-date">Fecha de Emisión</Label>
            <Input id="issue-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
          <div>
            <Label htmlFor="due-date">Fecha de Vencimiento</Label>
            <Input id="due-date" type="date" />
          </div>
        </div>

        {/* Issuer & Client */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Datos del Emisor</h3>
            <div className="space-y-2">
              <Label htmlFor="issuer-name">Nombre Legal</Label>
              <Input id="issuer-name" defaultValue="ViajesUCAB C.A." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer-id">RIF/EIN</Label>
              <Input id="issuer-id" defaultValue="J-12345678-9" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issuer-address">Dirección</Label>
              <Input id="issuer-address" defaultValue="Av. Principal, Caracas" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="issuer-email">Email</Label>
                <Input id="issuer-email" type="email" defaultValue="contacto@viajesucab.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer-phone">Teléfono</Label>
                <Input id="issuer-phone" defaultValue="+58 212 555-0100" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Datos del Cliente</h3>
            <div className="space-y-2">
              <Label htmlFor="client-name">Nombre / Razón Social *</Label>
              <Input id="client-name" placeholder="Nombre del cliente" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-id">Identificación *</Label>
              <Input id="client-id" placeholder="V-12345678 o J-12345678-9" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-address">Dirección</Label>
              <Input id="client-address" placeholder="Dirección del cliente" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="client-email">Email *</Label>
                <Input id="client-email" type="email" placeholder="cliente@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone">Teléfono</Label>
                <Input id="client-phone" placeholder="+58 412 555-0100" />
              </div>
            </div>
          </div>
        </div>

        {/* Currency & Payment Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Moneda</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VES">VES (Bolívares)</SelectItem>
                <SelectItem value="USD">USD (Dólares)</SelectItem>
                <SelectItem value="EUR">EUR (Euros)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Métodos de Pago (múltiple)</Label>
            <div className="grid grid-cols-2 gap-2">
              {["Tarjeta", "Zelle", "PayPal", "Transferencia", "USDT", "Efectivo"].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <Checkbox
                    id={method}
                    checked={paymentMethods.includes(method)}
                    onCheckedChange={() => togglePaymentMethod(method)}
                  />
                  <label htmlFor={method} className="text-sm cursor-pointer">
                    {method}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Ítems de la Factura</h3>
            <Button onClick={addItem} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Ítem
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <Card key={item.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Ítem {index + 1}</span>
                    {items.length > 1 && (
                      <Button onClick={() => removeItem(item.id)} variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Descripción *</Label>
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Ej: Paquete Caribe 7 noches"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <div className="space-y-2">
                      <Label>Cantidad *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Precio Unit. *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Descuento %</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount}
                        onChange={(e) => updateItem(item.id, "discount", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Impuesto %</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={item.tax}
                        onChange={(e) => updateItem(item.id, "tax", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Total</Label>
                      <div className="h-10 flex items-center px-3 bg-muted rounded-md font-semibold text-sm">
                        {currency} {calculateItemTotal(item).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Subtotal: {currency} {totals.subtotal.toFixed(2)}
                </p>
                <p className="text-sm text-red-600">
                  Descuentos: -{currency} {totals.totalDiscount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Impuestos: {currency} {totals.totalTax.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total a Pagar</p>
                <p className="text-3xl font-bold text-[#E91E63]">
                  {currency} {totals.total.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notas y Términos</Label>
          <Textarea id="notes" placeholder="Condiciones de pago, garantías, políticas de cancelación..." rows={3} />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleSaveDraft} variant="outline" className="flex-1 bg-transparent">
            <Save className="h-4 w-4 mr-2" />
            Guardar Borrador
          </Button>
          <Button onClick={() => setShowPreview(true)} className="flex-1 bg-[#E91E63] hover:bg-[#E91E63]/90">
            <Eye className="h-4 w-4 mr-2" />
            Vista Previa
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
