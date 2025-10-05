"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XCircle, AlertTriangle, Download, CheckCircle2, Clock } from "lucide-react"
import { useState } from "react"

export function CancellationsRefunds() {
  const [selectedReservation, setSelectedReservation] = useState("")
  const [cancellationReason, setCancellationReason] = useState("")

  const reservations = [
    {
      id: "VU2025-ABC123",
      destination: "Punta Cana, República Dominicana",
      date: "15 - 22 Marzo 2025",
      amount: 3400,
      status: "confirmed",
    },
    {
      id: "VU2025-DEF456",
      destination: "Madrid, España",
      date: "10 - 17 Junio 2025",
      amount: 4200,
      status: "pending",
    },
  ]

  const refundHistory = [
    {
      id: "REF-2024-001",
      reservation: "VU2024-XYZ789",
      destination: "Cancún, México",
      originalAmount: 2800,
      penalty: 280,
      refundAmount: 2520,
      status: "completed",
      date: "15 Enero 2025",
    },
    {
      id: "REF-2024-002",
      reservation: "VU2024-LMN456",
      destination: "Buenos Aires, Argentina",
      originalAmount: 1890,
      penalty: 189,
      refundAmount: 1701,
      status: "processing",
      date: "28 Diciembre 2024",
    },
  ]

  const selectedRes = reservations.find((r) => r.id === selectedReservation)
  const penalty = selectedRes ? selectedRes.amount * 0.1 : 0
  const refundAmount = selectedRes ? selectedRes.amount * 0.9 : 0

  return (
    <div className="space-y-6">
      {/* Cancellation Form */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Solicitar Cancelación
          </CardTitle>
          <CardDescription className="text-white/90">
            Selecciona la reserva que deseas cancelar y conoce el monto a reembolsar
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reservation">Seleccionar Reserva</Label>
            <Select value={selectedReservation} onValueChange={setSelectedReservation}>
              <SelectTrigger id="reservation">
                <SelectValue placeholder="Elige una reserva activa" />
              </SelectTrigger>
              <SelectContent>
                {reservations.map((res) => (
                  <SelectItem key={res.id} value={res.id}>
                    {res.id} - {res.destination} ({res.date})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRes && (
            <>
              <div className="border rounded-lg p-4 bg-muted/50 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Destino</span>
                  <span className="font-semibold">{selectedRes.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Fechas</span>
                  <span className="font-semibold">{selectedRes.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monto Original</span>
                  <span className="font-semibold">${selectedRes.amount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-amber-600">
                    <span className="text-sm flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Penalización (10%)
                    </span>
                    <span className="font-semibold">-${penalty.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Monto a Reembolsar (90%)</span>
                    <span className="font-bold text-[#E91E63]">${refundAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo de Cancelación (Opcional)</Label>
                <Textarea
                  id="reason"
                  placeholder="Cuéntanos por qué necesitas cancelar tu reserva..."
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4 inline mr-2" />
                  <strong>Política de Cancelación:</strong> Se aplicará una penalización del 10% sobre el monto total.
                  El reembolso se procesará en 5-10 días hábiles a tu método de pago original.
                </p>
              </div>

              <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90" size="lg">
                <XCircle className="h-4 w-4 mr-2" />
                Confirmar Cancelación
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Refund History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#E91E63]" />
            Historial de Reembolsos
          </CardTitle>
          <CardDescription>Seguimiento de tus solicitudes de cancelación y reembolsos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {refundHistory.map((refund) => (
            <div key={refund.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{refund.destination}</p>
                  <p className="text-sm text-muted-foreground">Reserva: {refund.reservation}</p>
                  <p className="text-xs text-muted-foreground mt-1">Solicitado: {refund.date}</p>
                </div>
                <Badge
                  variant={refund.status === "completed" ? "default" : "secondary"}
                  className={refund.status === "completed" ? "bg-green-500" : ""}
                >
                  {refund.status === "completed" ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completado
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      Procesando
                    </>
                  )}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Monto Original</p>
                  <p className="font-semibold">${refund.originalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Penalización</p>
                  <p className="font-semibold text-amber-600">-${refund.penalty.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reembolsado</p>
                  <p className="font-semibold text-green-600">${refund.refundAmount.toFixed(2)}</p>
                </div>
              </div>
              {refund.status === "completed" && (
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Nota de Crédito
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
