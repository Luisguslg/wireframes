"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Upload, CheckCircle2, ThumbsUp } from "lucide-react"

export function EnhancedSurvey() {
  const [npsScore, setNpsScore] = useState<number | null>(null)
  const [ratings, setRatings] = useState({
    quality: 0,
    priceValue: 0,
    punctuality: 0,
    staff: 0,
    operator: 0,
    destination: 0,
  })
  const [bestFeatures, setBestFeatures] = useState<string[]>([])
  const [improvements, setImprovements] = useState<string[]>([])
  const [publishReview, setPublishReview] = useState(false)
  const [receivePromos, setReceivePromos] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleMultiSelect = (value: string, list: string[], setter: (list: string[]) => void) => {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Survey submitted:", {
      npsScore,
      ratings,
      bestFeatures,
      improvements,
      publishReview,
      receivePromos,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card className="text-center">
        <CardContent className="p-12">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">¡Gracias por tu opinión!</h2>
          <p className="text-muted-foreground mb-6">
            Tu feedback ha sido registrado exitosamente y nos ayudará a mejorar nuestros servicios.
          </p>
          <Button onClick={() => setSubmitted(false)} className="bg-[#E91E63] hover:bg-[#E91E63]/90">
            Enviar Otra Encuesta
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
          <CardTitle>Encuesta Post-Viaje</CardTitle>
          <CardDescription className="text-white/90">Comparte tu experiencia con nosotros</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          {/* Identification Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Identificación del Viaje</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-number">Número de Reserva *</Label>
                <Input id="booking-number" placeholder="BK-2025-001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-type">Tipo de Servicio *</Label>
                <Select required>
                  <SelectTrigger id="service-type">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aereo">Aéreo</SelectItem>
                    <SelectItem value="terrestre">Terrestre</SelectItem>
                    <SelectItem value="maritimo">Marítimo</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="tour">Tour</SelectItem>
                    <SelectItem value="paquete">Paquete Completo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="operator">Operador *</Label>
                <Select required>
                  <SelectTrigger id="operator">
                    <SelectValue placeholder="Selecciona el operador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avianca">Avianca</SelectItem>
                    <SelectItem value="copa">Copa Airlines</SelectItem>
                    <SelectItem value="hilton">Hilton Hotels</SelectItem>
                    <SelectItem value="royal">Royal Caribbean</SelectItem>
                    <SelectItem value="local-tours">Local Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destino *</Label>
                <Input id="destination" placeholder="Ej: Cancún, México" required />
              </div>
            </div>
          </div>

          {/* NPS Score */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Net Promoter Score (NPS)</h3>
            <div className="space-y-3">
              <Label>¿Qué tan probable es que nos recomiendes a un amigo o familiar? *</Label>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setNpsScore(score)}
                    className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all ${
                      npsScore === score
                        ? "bg-[#E91E63] text-white border-[#E91E63] scale-110"
                        : "border-gray-300 hover:border-[#E91E63]"
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Nada probable</span>
                <span>Extremadamente probable</span>
              </div>
            </div>
          </div>

          {/* Star Ratings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Calificaciones Detalladas</h3>
            <div className="space-y-4">
              {[
                { key: "quality", label: "Calidad del Servicio" },
                { key: "priceValue", label: "Relación Precio-Valor" },
                { key: "punctuality", label: "Puntualidad / Cumplimiento de Itinerario" },
                { key: "staff", label: "Atención del Personal" },
                { key: "operator", label: "Experiencia con el Operador" },
                { key: "destination", label: "Experiencia en el Destino" },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <Label>{label} *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatings({ ...ratings, [key]: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= ratings[key as keyof typeof ratings]
                              ? "fill-[#E91E63] text-[#E91E63]"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground self-center">
                      {ratings[key as keyof typeof ratings]}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-select: Best Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">¿Qué fue lo mejor de tu experiencia?</h3>
            <p className="text-sm text-muted-foreground">Selecciona todas las que apliquen</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Precio competitivo",
                "Atención al cliente",
                "Facilidad de compra",
                "Flexibilidad de pagos",
                "Recomendaciones personalizadas",
                "Comparador de ofertas",
                "Variedad de destinos",
                "Calidad de los proveedores",
                "Proceso de reserva rápido",
                "Información clara y completa",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={bestFeatures.includes(feature)}
                    onCheckedChange={() => toggleMultiSelect(feature, bestFeatures, setBestFeatures)}
                  />
                  <label htmlFor={feature} className="text-sm cursor-pointer">
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-select: Areas to Improve */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">¿Qué podríamos mejorar?</h3>
            <p className="text-sm text-muted-foreground">Selecciona todas las que apliquen</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                "Catálogo de destinos",
                "Tiempos de respuesta",
                "Proceso de reembolsos",
                "Experiencia de usuario (UX)",
                "Información de productos",
                "Opciones de pago",
                "Atención postventa",
                "Comunicación durante el viaje",
                "Precios más competitivos",
                "Más promociones",
              ].map((improvement) => (
                <div key={improvement} className="flex items-center space-x-2">
                  <Checkbox
                    id={improvement}
                    checked={improvements.includes(improvement)}
                    onCheckedChange={() => toggleMultiSelect(improvement, improvements, setImprovements)}
                  />
                  <label htmlFor={improvement} className="text-sm cursor-pointer">
                    {improvement}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Comentarios Adicionales</h3>
            <div className="space-y-2">
              <Label htmlFor="comments">Cuéntanos más sobre tu experiencia</Label>
              <Textarea
                id="comments"
                placeholder="Comparte detalles, sugerencias o cualquier comentario que consideres importante..."
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-upload">Adjuntar Imagen (Opcional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Sube una foto de tu viaje</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG (máx. 5MB)</p>
              </div>
            </div>
          </div>

          {/* Consents */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Permisos y Preferencias</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="publish"
                  checked={publishReview}
                  onCheckedChange={(checked) => setPublishReview(checked as boolean)}
                />
                <div className="space-y-1">
                  <label htmlFor="publish" className="text-sm font-medium cursor-pointer">
                    Publicar mi reseña
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Autorizo a ViajesUCAB a publicar mi opinión en la plataforma (de forma anónima o con mi nombre)
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="promos"
                  checked={receivePromos}
                  onCheckedChange={(checked) => setReceivePromos(checked as boolean)}
                />
                <div className="space-y-1">
                  <label htmlFor="promos" className="text-sm font-medium cursor-pointer">
                    Recibir promociones
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Quiero recibir ofertas exclusivas, descuentos y novedades por email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Privacidad:</strong> Tus datos serán tratados de forma confidencial y utilizados únicamente para
              mejorar nuestros servicios. No compartiremos tu información con terceros sin tu consentimiento. Consulta
              nuestra Política de Privacidad para más detalles.
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90" size="lg">
            <ThumbsUp className="h-5 w-5 mr-2" />
            Enviar Encuesta
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
