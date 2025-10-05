"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Upload, Star, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { useState } from "react"

export function ClaimsSurveys() {
  const [claimType, setClaimType] = useState("")
  const [claimDescription, setClaimDescription] = useState("")
  const [rating, setRating] = useState(0)
  const [surveyComments, setSurveyComments] = useState("")

  const claims = [
    {
      id: "CLM-2025-001",
      type: "Vuelo",
      subject: "Retraso en vuelo de 4 horas",
      status: "in-progress",
      date: "10 Febrero 2025",
      reservation: "VU2025-ABC123",
    },
    {
      id: "CLM-2024-045",
      type: "Hotel",
      subject: "Habitación no coincide con reserva",
      status: "resolved",
      date: "28 Diciembre 2024",
      reservation: "VU2024-XYZ789",
    },
    {
      id: "CLM-2024-032",
      type: "Servicio",
      subject: "Tour cancelado sin previo aviso",
      status: "open",
      date: "15 Noviembre 2024",
      reservation: "VU2024-LMN456",
    },
  ]

  const surveys = [
    {
      id: "SUR-2025-001",
      destination: "Punta Cana, República Dominicana",
      date: "22 Marzo 2025",
      completed: false,
    },
    {
      id: "SUR-2024-012",
      destination: "Cancún, México",
      date: "15 Enero 2025",
      completed: true,
      rating: 5,
    },
  ]

  return (
    <Tabs defaultValue="claims" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="claims">Reclamos</TabsTrigger>
        <TabsTrigger value="surveys">Encuestas</TabsTrigger>
      </TabsList>

      {/* Claims Tab */}
      <TabsContent value="claims" className="space-y-6">
        {/* New Claim Form */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Abrir Nuevo Caso
            </CardTitle>
            <CardDescription className="text-white/90">
              Describe tu problema y te ayudaremos a resolverlo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claim-type">Tipo de Problema</Label>
              <Select value={claimType} onValueChange={setClaimType}>
                <SelectTrigger id="claim-type">
                  <SelectValue placeholder="Selecciona el tipo de problema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flight">Vuelo</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="service">Servicio/Tour</SelectItem>
                  <SelectItem value="payment">Pago/Facturación</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-reservation">Número de Reserva</Label>
              <Input id="claim-reservation" placeholder="VU2025-ABC123" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-subject">Asunto</Label>
              <Input id="claim-subject" placeholder="Breve descripción del problema" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-description">Descripción Detallada</Label>
              <Textarea
                id="claim-description"
                placeholder="Describe tu problema con el mayor detalle posible..."
                value={claimDescription}
                onChange={(e) => setClaimDescription(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claim-file">Adjuntar Archivo (Opcional)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Haz clic para subir o arrastra archivos aquí</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (máx. 10MB)</p>
              </div>
            </div>

            <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90" size="lg">
              <MessageSquare className="h-4 w-4 mr-2" />
              Enviar Reclamo
            </Button>
          </CardContent>
        </Card>

        {/* Claims List */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Casos</CardTitle>
            <CardDescription>Seguimiento de tus reclamos abiertos y resueltos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{claim.type}</Badge>
                      <Badge
                        variant={
                          claim.status === "resolved"
                            ? "default"
                            : claim.status === "in-progress"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          claim.status === "resolved"
                            ? "bg-green-500"
                            : claim.status === "in-progress"
                              ? "bg-blue-500"
                              : ""
                        }
                      >
                        {claim.status === "resolved" ? (
                          <>
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Resuelto
                          </>
                        ) : claim.status === "in-progress" ? (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            En Proceso
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Abierto
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="font-semibold">{claim.subject}</p>
                    <p className="text-sm text-muted-foreground mt-1">Caso: {claim.id}</p>
                    <p className="text-xs text-muted-foreground">
                      Reserva: {claim.reservation} • {claim.date}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      {/* Surveys Tab */}
      <TabsContent value="surveys" className="space-y-6">
        {/* Pending Surveys */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white">
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Encuestas Pendientes
            </CardTitle>
            <CardDescription className="text-white/90">Ayúdanos a mejorar compartiendo tu experiencia</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {surveys
              .filter((s) => !s.completed)
              .map((survey) => (
                <div key={survey.id} className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{survey.destination}</h3>
                    <p className="text-sm text-muted-foreground">Viaje completado: {survey.date}</p>
                  </div>

                  <div className="space-y-2">
                    <Label>¿Cómo calificarías tu experiencia general?</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= rating ? "fill-[#E91E63] text-[#E91E63]" : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="survey-comments">Comentarios (Opcional)</Label>
                    <Textarea
                      id="survey-comments"
                      placeholder="Cuéntanos sobre tu experiencia..."
                      value={surveyComments}
                      onChange={(e) => setSurveyComments(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Enviar Encuesta
                  </Button>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* Completed Surveys */}
        <Card>
          <CardHeader>
            <CardTitle>Encuestas Completadas</CardTitle>
            <CardDescription>Tus opiniones anteriores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {surveys
              .filter((s) => s.completed)
              .map((survey) => (
                <div key={survey.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{survey.destination}</p>
                      <p className="text-sm text-muted-foreground">{survey.date}</p>
                      <div className="flex gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (survey.rating || 0) ? "fill-[#E91E63] text-[#E91E63]" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <Badge className="bg-green-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completada
                    </Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
