"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plug, Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Shield, Ticket } from "lucide-react"

interface Integration {
  id: string
  name: string
  provider: string
  type: "insurance" | "events"
  cost: number
  commission: number
  currency: string
  description: string
  active: boolean
}

export function IntegrationsManagement() {
  const [view, setView] = useState<"list" | "create" | "edit">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)

  const integrations: Integration[] = [
    {
      id: "1",
      name: "Seguro de Viaje Básico",
      provider: "TravelSafe Insurance",
      type: "insurance",
      cost: 25,
      commission: 5,
      currency: "USD",
      description: "Cobertura médica hasta $50,000 y cancelación",
      active: true,
    },
    {
      id: "2",
      name: "Seguro Premium",
      provider: "WorldCover",
      type: "insurance",
      cost: 75,
      commission: 15,
      currency: "USD",
      description: "Cobertura completa hasta $200,000",
      active: true,
    },
    {
      id: "3",
      name: "Entradas Parque Temático",
      provider: "TicketMaster",
      type: "events",
      cost: 89,
      commission: 10,
      currency: "USD",
      description: "Acceso a principales parques temáticos",
      active: true,
    },
  ]

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || integration.type === typeFilter
    return matchesSearch && matchesType
  })

  if (view === "create" || view === "edit") {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Plug className="h-5 w-5 text-[#E91E63]" />
                {view === "create" ? "Agregar Nueva Integración" : "Editar Integración"}
              </CardTitle>
              <CardDescription>
                {view === "create"
                  ? "Configure un nuevo servicio de terceros"
                  : "Modifique los datos de la integración"}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => setView("list")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Servicio *</Label>
                <Input id="name" placeholder="Seguro de Viaje Básico" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">Proveedor *</Label>
                <Input id="provider" placeholder="TravelSafe Insurance" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Integración *</Label>
              <Select defaultValue="insurance">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="insurance">Seguro de Viaje</SelectItem>
                  <SelectItem value="events">Entradas a Eventos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Textarea id="description" placeholder="Descripción del servicio y cobertura..." rows={3} />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="cost">Costo *</Label>
                <Input id="cost" type="number" step="0.01" placeholder="25.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="commission">Comisión *</Label>
                <Input id="commission" type="number" step="0.01" placeholder="5.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Moneda *</Label>
                <Select defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key / Credenciales</Label>
              <Input id="apiKey" type="password" placeholder="••••••••••••" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="bg-[#E91E63] hover:bg-[#C2185B]">
                {view === "create" ? "Agregar Integración" : "Guardar Cambios"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setView("list")}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Plug className="h-5 w-5 text-[#E91E63]" />
              Integraciones de Terceros
            </CardTitle>
            <CardDescription>Seguros de viaje, entradas a eventos y otros servicios</CardDescription>
          </div>
          <Button onClick={() => setView("create")} className="bg-[#E91E63] hover:bg-[#C2185B]">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Integración
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar integraciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="insurance">Seguros</SelectItem>
                <SelectItem value="events">Eventos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Comisión</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIntegrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron integraciones
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIntegrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {integration.type === "insurance" ? (
                            <Shield className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Ticket className="h-4 w-4 text-purple-600" />
                          )}
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-sm text-muted-foreground">{integration.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{integration.provider}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{integration.type === "insurance" ? "Seguro" : "Eventos"}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {integration.currency} ${integration.cost}
                      </TableCell>
                      <TableCell className="text-green-600 font-medium">${integration.commission}</TableCell>
                      <TableCell>
                        <Badge
                          variant={integration.active ? "default" : "secondary"}
                          className={integration.active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                        >
                          {integration.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setView("edit")}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700"
                            onClick={() => {
                              setSelectedIntegration(integration)
                              setDeleteDialogOpen(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredIntegrations.length} de {integrations.length} integraciones
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la integración "{selectedIntegration?.name}"? Esta acción no se puede
              deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("[v0] Deleting integration:", selectedIntegration?.name)
                setDeleteDialogOpen(false)
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
