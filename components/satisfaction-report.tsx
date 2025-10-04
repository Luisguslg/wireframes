"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Smile, TrendingUp, Users } from "lucide-react"

const satisfactionKpis = [
  {
    id: "nps",
    label: "NPS actual",
    value: "58",
    helper: "+6 pts vs mes anterior",
    icon: TrendingUp,
  },
  {
    id: "csat",
    label: "CSAT promedio",
    value: "4.5 / 5",
    helper: "Objetivo trimestral 4.7",
    icon: Smile,
  },
  {
    id: "response",
    label: "Tasa de respuesta",
    value: "74%",
    helper: "+3 pts en 30 dias",
    icon: Users,
  },
  {
    id: "reviews",
    label: "Resenas publicas",
    value: "126",
    helper: "18% mas que 2024",
    icon: MessageSquare,
  },
]

const serviceScores = [
  { service: "Reservas en linea", score: 4.6, change: "+0.2" },
  { service: "Atencion telefonica", score: 4.1, change: "+0.1" },
  { service: "Tours y actividades", score: 4.4, change: "=" },
  { service: "Hoteles asociados", score: 3.9, change: "-0.3" },
  { service: "Seguro de viaje", score: 4.3, change: "+0.4" },
]

const driverInsights = [
  {
    title: "Agilidad en check-in",
    impact: "alto",
    detail: "Clientes destacan confirmaciones rapidas cuando se reserva con paqueteria completa",
  },
  {
    title: "Comunicacion pre viaje",
    impact: "medio",
    detail: "Los recordatorios automaticos elevan 12 pts el CSAT en nuevos clientes",
  },
  {
    title: "Manejo de incidencias",
    impact: "critico",
    detail: "Casos con resolucion mayor a 24h caen a 3.4 de satisfaccion promedio",
  },
]

const channelHealth = [
  { channel: "Email post viaje", share: 45, score: 4.6, trend: "+0.2" },
  { channel: "App movil", share: 28, score: 4.2, trend: "+0.1" },
  { channel: "Encuesta presencial", share: 17, score: 4.8, trend: "=", },
  { channel: "SMS", share: 10, score: 3.9, trend: "-0.3" },
]

const recentFeedback = [
  {
    id: "fb-001",
    traveler: "Andrea M.",
    destination: "Madrid",
    rating: 5,
    highlight: "Equipo de soporte acompanando durante la huelga de transporte.",
  },
  {
    id: "fb-002",
    traveler: "Luis R.",
    destination: "Cartagena",
    rating: 4,
    highlight: "Buena logistica pero el hotel no tenia claro el early check-in.",
  },
  {
    id: "fb-003",
    traveler: "Maria C.",
    destination: "Bariloche",
    rating: 3,
    highlight: "Servicio de traslado llego 30 minutos tarde.",
  },
]

export function SatisfactionReport() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Resumen ejecutivo</CardTitle>
          <CardDescription>Indicadores principales de satisfaccion del trimestre</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {satisfactionKpis.map((kpi) => {
            const Icon = kpi.icon

            return (
              <div key={kpi.id} className="flex flex-col gap-3 rounded-lg border bg-background p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  <Badge variant="outline" className="gap-1">
                    <Icon className="h-3.5 w-3.5" />
                    indicador
                  </Badge>
                </div>
                <p className="text-3xl font-semibold">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.helper}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Puntuacion por servicio</CardTitle>
          <CardDescription>Comparativa de experiencias reportadas en los ultimos 60 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Servicio</TableHead>
                <TableHead>Puntuacion</TableHead>
                <TableHead>Tendencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceScores.map((item) => (
                <TableRow key={item.service}>
                  <TableCell className="font-medium">{item.service}</TableCell>
                  <TableCell>{item.score.toFixed(1)}</TableCell>
                  <TableCell>
                    <Badge variant={item.change.startsWith("-") ? "destructive" : "secondary"}>
                      {item.change}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Drivers principales</CardTitle>
            <CardDescription>Temas que mas impactan la satisfaccion general</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {driverInsights.map((driver) => (
              <div key={driver.title} className="rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{driver.title}</p>
                  <Badge variant={driver.impact === "critico" ? "destructive" : "secondary"}>
                    {driver.impact.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{driver.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salud por canal de encuesta</CardTitle>
            <CardDescription>Volumen y satisfaccion promedio por canal activo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channelHealth.map((channel) => (
              <div key={channel.channel} className="space-y-2 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{channel.channel}</p>
                    <p className="text-xs text-muted-foreground">Participacion {channel.share}%</p>
                  </div>
                  <Badge variant={channel.trend.startsWith("-") ? "destructive" : "secondary"}>
                    {channel.trend}
                  </Badge>
                </div>
                <Progress value={channel.share} />
                <p className="text-xs text-muted-foreground">Puntuacion promedio {channel.score.toFixed(1)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback reciente</CardTitle>
          <CardDescription>Resumen de comentarios abiertos clasificados por destino</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentFeedback.map((feedback) => (
            <div key={feedback.id} className="rounded-lg border bg-background p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{feedback.traveler}</p>
                  <p className="text-xs text-muted-foreground">Destino {feedback.destination}</p>
                </div>
                <Badge variant={feedback.rating < 4 ? "destructive" : "secondary"}>
                  {feedback.rating} / 5
                </Badge>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{feedback.highlight}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conclusiones rapidas</CardTitle>
          <CardDescription>Puntos de accion sugeridos para el equipo de experiencia</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Prioridad alta</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Reforzar protocolos de Comunicacion con hoteles asociados de categoria media.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Prioridad media</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Automatizar seguimiento de incidencias cuando se detectan demoras mayores a 12h.
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">Prioridad emergente</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Disenar beneficios exclusivos para incentivar respuesta via app movil.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
