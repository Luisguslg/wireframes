"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Download, Mail, Plane, Hotel, Users, MapPin, FileText, QrCode, Printer } from "lucide-react"
import Link from "next/link"

export function ConfirmationContent() {
  const reservationNumber = "VU2025-" + Math.random().toString(36).substring(2, 9).toUpperCase()

  return (
    <div className="bg-muted/30 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">¡Reserva Confirmada!</h1>
          <p className="text-lg text-muted-foreground">
            Gracias por viajar con ViajesUCAB. Te enviamos copia por correo electrónico.
          </p>
        </div>

        {/* Reservation Number */}
        <Card className="mb-6 border-2 border-[#E91E63]">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Número de Reserva</p>
                <p className="text-2xl font-bold text-[#E91E63]">{reservationNumber}</p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Boleto
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Descargar Factura
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Digital Ticket */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Boleto Digital - Vuelo
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pasajero</p>
                  <p className="font-semibold text-lg">Juan Pérez</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ruta</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Caracas (CCS)</span>
                    <Plane className="h-4 w-4 text-[#E91E63]" />
                    <span className="font-semibold">Punta Cana (PUJ)</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fecha de Salida</p>
                    <p className="font-semibold">15 Marzo 2025</p>
                    <p className="text-sm text-muted-foreground">08:30 AM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Fecha de Regreso</p>
                    <p className="font-semibold">22 Marzo 2025</p>
                    <p className="text-sm text-muted-foreground">06:45 PM</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Asiento</p>
                  <Badge className="bg-[#E91E63]">12A</Badge>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
                <QrCode className="h-32 w-32 text-[#E91E63] mb-3" />
                <p className="text-sm text-center text-muted-foreground">
                  Escanea este código en el aeropuerto para hacer check-in
                </p>
                <p className="text-xs text-center text-muted-foreground mt-2 font-mono">{reservationNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Ticket */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
            <CardTitle className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              Boleto Digital - Hotel
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hotel</p>
                  <p className="font-semibold text-lg">Grand Palladium Punta Cana Resort & Spa</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    Punta Cana, República Dominicana
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                    <p className="font-semibold">15 Marzo 2025</p>
                    <p className="text-sm text-muted-foreground">3:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                    <p className="font-semibold">22 Marzo 2025</p>
                    <p className="text-sm text-muted-foreground">12:00 PM</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Habitación</p>
                  <p className="font-semibold">Suite Junior Vista al Mar</p>
                  <Badge variant="secondary">Todo Incluido</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Huéspedes</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Users className="h-4 w-4" />2 adultos
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
                <QrCode className="h-32 w-32 text-[#E91E63] mb-3" />
                <p className="text-sm text-center text-muted-foreground">
                  Presenta este código en la recepción del hotel
                </p>
                <p className="text-xs text-center text-muted-foreground mt-2 font-mono">{reservationNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resumen de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vuelo (2 pasajeros)</span>
                <span className="font-semibold">$1,200.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hotel (7 noches)</span>
                <span className="font-semibold">$1,890.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Impuestos y tasas</span>
                <span className="font-semibold">$310.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total Pagado</span>
                <span className="font-bold text-[#E91E63]">$3,400.00</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Pagado con Tarjeta de Crédito •••• 4242
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Information */}
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Mail className="h-5 w-5 text-amber-600" />
              Información Importante
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Hemos enviado una copia de tu boleto y factura a tu correo electrónico</li>
              <li>• Recuerda llegar al aeropuerto con 3 horas de anticipación para vuelos internacionales</li>
              <li>• Verifica que tu pasaporte tenga al menos 6 meses de validez</li>
              <li>• Puedes hacer check-in online 24 horas antes de tu vuelo</li>
              <li>• Para cualquier cambio o cancelación, consulta nuestra política en tu perfil</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/perfil">
              <Users className="h-4 w-4 mr-2" />
              Ver en Mi Perfil
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <MapPin className="h-4 w-4 mr-2" />
              Explorar Más Destinos
            </Link>
          </Button>
          <Button size="lg" className="bg-[#E91E63] hover:bg-[#E91E63]/90">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir Todo
          </Button>
        </div>
      </div>
    </div>
  )
}
