"use client"

import type { FormEvent } from "react"
import { useMemo, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { MessageSquare, Sparkles, Star, Target } from "lucide-react"

const overviewMetrics = [
  {
    id: "nps",
    label: "NPS ultimo mes",
    value: "58",
    helper: "+6 vs mes anterior",
  },
  {
    id: "csat",
    label: "CSAT global",
    value: "4.5 / 5",
    helper: "Promedio ultimas 500 respuestas",
  },
  {
    id: "response",
    label: "Tasa de respuesta",
    value: "74%",
    helper: "+3 pts en la ultima campana",
  },
]

const focusSegments = [
  {
    id: "vip",
    label: "Clientes fidelizados",
    score: 4.7,
    variation: "+0.3",
  },
  {
    id: "new",
    label: "Reservas web nuevas",
    score: 4.2,
    variation: "+0.1",
  },
  {
    id: "support",
    label: "Casos posventa",
    score: 3.8,
    variation: "-0.2",
  },
]

const improvementIdeas = [
  "Reducir tiempos de respuesta en soporte posventa",
  "Ofrecer recordatorios automaticos de check-in",
  "Visibilizar mejor beneficios del programa verde",
]

const serviceQuestions = [
  { id: "booking", label: "Proceso de compra" },
  { id: "communication", label: "Comunicacion durante el viaje" },
  { id: "experience", label: "Experiencia general en destino" },
  { id: "support", label: "Soporte posviaje" },
]

const journeyOptions = [
  { id: "post-travel", label: "Post viaje (48h despues)" },
  { id: "loyalty", label: "Programa de fidelidad" },
  { id: "cancellations", label: "Clientes con cancelaciones" },
]

const ratingScale = [1, 2, 3, 4, 5]

export function EnhancedSurvey() {
  const [journey, setJourney] = useState<string>(journeyOptions[0]?.id ?? "post-travel")
  const [responses, setResponses] = useState<Record<string, number>>(() =>
    Object.fromEntries(serviceQuestions.map((question) => [question.id, 0])),
  )
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const averageScore = useMemo(() => {
    const values = Object.values(responses).filter((value) => value > 0)

    if (!values.length) {
      return { percent: 0, mean: "0.0" }
    }

    const sum = values.reduce((acc, value) => acc + value, 0)
    const mean = sum / values.length

    return {
      percent: Math.round((mean / 5) * 100),
      mean: mean.toFixed(1),
    }
  }, [responses])

  const handleRating = (questionId: string, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Resumen de satisfaccion</CardTitle>
            <CardDescription>Seguimiento en tiempo real de las encuestas activas</CardDescription>
          </div>
          <Badge variant="secondary" className="w-fit gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            Campana activa Q1
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {overviewMetrics.map((metric) => (
              <div key={metric.id} className="rounded-lg border bg-background p-4 shadow-sm">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{metric.helper}</p>
              </div>
            ))}

            <div className="rounded-lg border bg-muted/40 p-4 shadow-sm">
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Target className="h-4 w-4" />
                Promedio actual usuarios encuestados
              </span>
              <p className="mt-2 text-2xl font-semibold">{averageScore.mean}</p>
              <Progress value={averageScore.percent} className="mt-4" />
              <p className="mt-1 text-xs text-muted-foreground">
                {averageScore.percent}% de satisfaccion promedio en respuestas validas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segmentos monitoreados</CardTitle>
          <CardDescription>Evalua como cambia la experiencia en cada grupo clave</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {focusSegments.map((segment) => (
            <div key={segment.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{segment.label}</p>
                <Badge variant="outline">{segment.variation}</Badge>
              </div>
              <p className="mt-3 text-3xl font-semibold">{segment.score.toFixed(1)}</p>
              <Progress value={(segment.score / 5) * 100} className="mt-3" />
              <p className="mt-1 text-xs text-muted-foreground">
                Meta interna 4.5 / 5
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Encuesta personalizada</CardTitle>
          <CardDescription>Configura el recorrido que deseas medir y captura feedback accionable</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="journey">Ciclo a evaluar</Label>
                <Select value={journey} onValueChange={setJourney}>
                  <SelectTrigger id="journey" className="bg-background">
                    <SelectValue placeholder="Selecciona un ciclo" />
                  </SelectTrigger>
                  <SelectContent>
                    {journeyOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Progreso del cuestionario</Label>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="text-2xl font-semibold">
                    {averageScore.percent}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Calculado con las preguntas calificadas hasta ahora
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {serviceQuestions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label>{question.label}</Label>
                  <div className="flex gap-2">
                    {ratingScale.map((score) => {
                      const isActive = responses[question.id] >= score

                      return (
                        <button
                          key={score}
                          type="button"
                          onClick={() => handleRating(question.id, score)}
                          className={cn(
                            "rounded-md border bg-background p-2 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                            isActive && "border-primary bg-primary/10 text-primary",
                          )}
                          aria-label={`Calificar con ${score} ${score === 1 ? "estrella" : "estrellas"}`}
                        >
                          <Star
                            className={cn(
                              "h-5 w-5",
                              isActive ? "fill-current" : "text-muted-foreground",
                            )}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Comentarios complementarios</Label>
              <Textarea
                id="comment"
                placeholder="Comparte detalles sobre lo que funciono bien o lo que debemos mejorar"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={4}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Registrar respuesta
              </Button>
              {submitted && (
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Sparkles className="h-4 w-4" />
                  Guardamos el feedback para este ciclo
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ideas de mejora priorizadas</CardTitle>
          <CardDescription>Acciones sugeridas a partir de los datos de la encuesta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {improvementIdeas.map((idea, index) => (
            <div key={idea} className="flex items-start gap-3 rounded-lg border bg-muted/30 p-4">
              <Badge variant="secondary" className="mt-0.5">{index + 1}</Badge>
              <div>
                <p className="font-medium">{idea}</p>
                <p className="text-xs text-muted-foreground">
                  Sugerencia basada en tendencias de comentarios abiertos y calificaciones bajas recogidas en el recorrido actual
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
