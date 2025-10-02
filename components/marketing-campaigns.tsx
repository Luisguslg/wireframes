"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Megaphone,
  Plus,
  Mail,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Download,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  FileText,
  Target,
  Zap,
  BarChart3,
  Send,
  Clock,
} from "lucide-react"
import { useState } from "react"

export function MarketingCampaigns() {
  const [activeTab, setActiveTab] = useState("campaigns")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const campaigns = [
    {
      id: 1,
      name: "Promoción Europa Primavera",
      type: "Email",
      audience: "Todos los clientes",
      audienceCount: 1248,
      sent: 1248,
      opened: 892,
      clicks: 456,
      conversions: 89,
      revenue: 42350,
      status: "active",
      startDate: "2025-02-01",
      endDate: "2025-03-31",
      abTest: true,
    },
    {
      id: 2,
      name: "Caribe Todo Incluido",
      type: "SMS",
      audience: "Familias",
      audienceCount: 645,
      sent: 645,
      opened: 534,
      clicks: 234,
      conversions: 45,
      revenue: 18900,
      status: "active",
      startDate: "2025-02-10",
      endDate: "2025-02-28",
      abTest: false,
    },
    {
      id: 3,
      name: "Black Friday Viajes",
      type: "Email + SMS",
      audience: "Todos los clientes",
      audienceCount: 2156,
      sent: 2156,
      opened: 1823,
      clicks: 892,
      conversions: 234,
      revenue: 125600,
      status: "completed",
      startDate: "2024-11-20",
      endDate: "2024-11-30",
      abTest: true,
    },
    {
      id: 4,
      name: "Reactivación Clientes Inactivos",
      type: "Email",
      audience: "Inactivos 6+ meses",
      audienceCount: 423,
      sent: 0,
      opened: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      status: "scheduled",
      startDate: "2025-02-20",
      endDate: "2025-03-20",
      abTest: false,
    },
  ]

  const templates = [
    { id: 1, name: "Promoción Destino", category: "Promociones", uses: 45 },
    { id: 2, name: "Bienvenida Nuevo Cliente", category: "Onboarding", uses: 234 },
    { id: 3, name: "Recordatorio Carrito Abandonado", category: "Automatización", uses: 156 },
    { id: 4, name: "Confirmación de Reserva", category: "Transaccional", uses: 892 },
    { id: 5, name: "Encuesta Post-Viaje", category: "Feedback", uses: 67 },
  ]

  const automations = [
    {
      id: 1,
      name: "Bienvenida Nuevos Usuarios",
      trigger: "Registro completado",
      actions: "Enviar email de bienvenida + SMS",
      status: "active",
      triggered: 234,
    },
    {
      id: 2,
      name: "Carrito Abandonado",
      trigger: "24h sin completar reserva",
      actions: "Email recordatorio + 10% descuento",
      status: "active",
      triggered: 156,
    },
    {
      id: 3,
      name: "Post-Viaje Feedback",
      trigger: "7 días después del viaje",
      actions: "Encuesta de satisfacción",
      status: "active",
      triggered: 89,
    },
    {
      id: 4,
      name: "Cumpleaños Cliente",
      trigger: "Cumpleaños del cliente",
      actions: "Email con oferta especial",
      status: "paused",
      triggered: 45,
    },
  ]

  const segments = [
    { id: 1, name: "Todos los clientes", count: 1248, criteria: "Todos los usuarios registrados" },
    { id: 2, name: "Familias", count: 645, criteria: "Viajes con 3+ personas" },
    { id: 3, name: "Parejas", count: 423, criteria: "Viajes con 2 personas" },
    { id: 4, name: "Viajes de negocios", count: 180, criteria: "Categoría: Business" },
    { id: 5, name: "Clientes VIP", count: 89, criteria: "Gasto total > $10,000" },
    { id: 6, name: "Inactivos 6+ meses", count: 234, criteria: "Sin reservas en 6 meses" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "completed":
        return "bg-slate-500"
      case "paused":
        return "bg-amber-500"
      default:
        return "bg-slate-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "scheduled":
        return "Programada"
      case "completed":
        return "Completada"
      case "paused":
        return "Pausada"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Marketing y Campañas</h2>
          <p className="text-sm text-muted-foreground">Gestión completa de campañas y automatización</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Campaña
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="automation">Automatización</TabsTrigger>
          <TabsTrigger value="segments">Segmentos</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          {showCreateForm && (
            <Card>
              <CardHeader className="bg-slate-900 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Crear Nueva Campaña
                </CardTitle>
                <CardDescription className="text-slate-300">Diseñar y programar campañas de marketing</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
                    <Input id="campaign-name" placeholder="Ej: Promoción Europa Primavera" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campaign-type">Tipo de Campaña</Label>
                    <Select>
                      <SelectTrigger id="campaign-type">
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Notificación Push</SelectItem>
                        <SelectItem value="email-sms">Email + SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-segment">Segmento de Audiencia</Label>
                  <Select>
                    <SelectTrigger id="campaign-segment">
                      <SelectValue placeholder="Seleccionar segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      {segments.map((segment) => (
                        <SelectItem key={segment.id} value={segment.id.toString()}>
                          {segment.name} ({segment.count} usuarios)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="ab-test">Prueba A/B</Label>
                    <p className="text-sm text-muted-foreground">Probar dos versiones de la campaña</p>
                  </div>
                  <Switch id="ab-test" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Fecha de Inicio</Label>
                    <Input id="start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">Fecha de Fin</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-subject">Asunto del Email / Mensaje SMS</Label>
                  <Input id="campaign-subject" placeholder="Ej: ¡50% OFF en viajes a Europa!" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-template">Plantilla</Label>
                  <Select>
                    <SelectTrigger id="campaign-template">
                      <SelectValue placeholder="Seleccionar plantilla o crear desde cero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blank">Crear desde cero</SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id.toString()}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campaign-message">Contenido del Mensaje</Label>
                  <Textarea id="campaign-message" placeholder="Escribe el contenido de tu campaña..." rows={6} />
                  <p className="text-xs text-muted-foreground">
                    Variables disponibles: {"{nombre}"}, {"{destino}"}, {"{descuento}"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 bg-slate-900 hover:bg-slate-800 gap-2">
                    <Send className="h-4 w-4" />
                    Enviar Ahora
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                    <Clock className="h-4 w-4" />
                    Programar Envío
                  </Button>
                  <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-[#E91E63]" />
                    Campañas Activas y Programadas
                  </CardTitle>
                  <CardDescription>Gestión y seguimiento de campañas</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar campañas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{campaign.name}</h4>
                        <Badge className={getStatusColor(campaign.status)}>{getStatusLabel(campaign.status)}</Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                        {campaign.abTest && (
                          <Badge variant="outline" className="gap-1">
                            <Target className="h-3 w-3" />
                            A/B Test
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {campaign.audience} ({campaign.audienceCount} usuarios)
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {campaign.startDate} - {campaign.endDate}
                        </span>
                      </div>

                      {campaign.status !== "scheduled" && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-slate-50 rounded-lg">
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <Send className="h-3 w-3" />
                              Enviados
                            </p>
                            <p className="text-lg font-bold">{campaign.sent.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <Mail className="h-3 w-3" />
                              Abiertos
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              {campaign.opened.toLocaleString()}
                              <span className="text-xs ml-1">
                                ({campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0}%)
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <Users className="h-3 w-3" />
                              Clics
                            </p>
                            <p className="text-lg font-bold text-purple-600">
                              {campaign.clicks.toLocaleString()}
                              <span className="text-xs ml-1">
                                ({campaign.sent > 0 ? ((campaign.clicks / campaign.sent) * 100).toFixed(1) : 0}%)
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <TrendingUp className="h-3 w-3" />
                              Conversiones
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {campaign.conversions.toLocaleString()}
                              <span className="text-xs ml-1">
                                ({campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(1) : 0}
                                %)
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                              <DollarSign className="h-3 w-3" />
                              Ingresos
                            </p>
                            <p className="text-lg font-bold text-[#E91E63]">${campaign.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <BarChart3 className="h-3 w-3" />
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Edit className="h-3 w-3" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Copy className="h-3 w-3" />
                      Duplicar
                    </Button>
                    {campaign.status === "active" && (
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Pause className="h-3 w-3" />
                        Pausar
                      </Button>
                    )}
                    {campaign.status === "paused" && (
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Play className="h-3 w-3" />
                        Reanudar
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="h-3 w-3" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#E91E63]" />
                    Plantillas de Campañas
                  </CardTitle>
                  <CardDescription>Plantillas reutilizables para emails y SMS</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Plantilla
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mt-1">
                          {template.category}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Usado {template.uses} veces</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                          <Copy className="h-3 w-3" />
                          Usar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#E91E63]" />
                    Campañas Automatizadas
                  </CardTitle>
                  <CardDescription>Campañas activadas por eventos y comportamiento del usuario</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Automatización
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {automations.map((automation) => (
                <div key={automation.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{automation.name}</h4>
                        <Badge className={automation.status === "active" ? "bg-green-500" : "bg-amber-500"}>
                          {automation.status === "active" ? "Activa" : "Pausada"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Disparador:</span> {automation.trigger}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Acciones:</span> {automation.actions}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Activaciones:</span> {automation.triggered} veces
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Edit className="h-3 w-3" />
                      Editar
                    </Button>
                    {automation.status === "active" ? (
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Pause className="h-3 w-3" />
                        Pausar
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Play className="h-3 w-3" />
                        Activar
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <BarChart3 className="h-3 w-3" />
                      Ver Métricas
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-[#E91E63]" />
                    Segmentos de Audiencia
                  </CardTitle>
                  <CardDescription>Grupos de usuarios basados en criterios específicos</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Segmento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {segments.map((segment) => (
                  <div key={segment.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold">{segment.name}</h4>
                        <Badge variant="outline">{segment.count} usuarios</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{segment.criteria}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Edit className="h-3 w-3" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Send className="h-3 w-3" />
                        Crear Campaña
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#E91E63]" />
                Calendario de Campañas
              </CardTitle>
              <CardDescription>Vista cronológica de campañas programadas y activas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm">
                    Hoy
                  </Button>
                  <Button variant="outline" size="sm">
                    Esta Semana
                  </Button>
                  <Button variant="outline" size="sm">
                    Este Mes
                  </Button>
                  <div className="flex-1" />
                  <Button variant="outline" size="sm">
                    Mes Anterior
                  </Button>
                  <span className="font-semibold">Febrero 2025</span>
                  <Button variant="outline" size="sm">
                    Mes Siguiente
                  </Button>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground">Febrero 2025</h4>
                  {campaigns
                    .filter((c) => c.status === "active" || c.status === "scheduled")
                    .map((campaign) => (
                      <div key={campaign.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#E91E63]/10">
                          <Calendar className="h-5 w-5 text-[#E91E63]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold">{campaign.name}</h5>
                            <Badge className={getStatusColor(campaign.status)} variant="default">
                              {getStatusLabel(campaign.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
