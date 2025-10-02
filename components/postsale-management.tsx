"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HeadphonesIcon,
  Search,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface Cancellation {
  id: string
  bookingId: string
  customerName: string
  service: string
  amount: number
  penalty: number
  refund: number
  status: "pending" | "approved" | "rejected"
  requestDate: string
}

interface Claim {
  id: string
  bookingId: string
  customerName: string
  type: string
  description: string
  status: "open" | "in-progress" | "resolved"
  createdAt: string
}

interface Survey {
  id: string
  bookingId: string
  customerName: string
  service: string
  rating: number
  feedback: string
  date: string
}

export function PostsaleManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("cancellations")

  const cancellations: Cancellation[] = [
    {
      id: "1",
      bookingId: "BK-2025-001",
      customerName: "Juan Pérez",
      service: "Paquete Caribe 7 noches",
      amount: 1299,
      penalty: 129.9,
      refund: 1169.1,
      status: "pending",
      requestDate: "2025-02-10",
    },
    {
      id: "2",
      bookingId: "BK-2025-045",
      customerName: "María González",
      service: "Vuelo CCS-MIA",
      amount: 450,
      penalty: 45,
      refund: 405,
      status: "approved",
      requestDate: "2025-02-09",
    },
  ]

  const claims: Claim[] = [
    {
      id: "1",
      bookingId: "BK-2025-023",
      customerName: "Carlos Rodríguez",
      type: "Retraso de vuelo",
      description: "Vuelo retrasado 4 horas sin compensación",
      status: "in-progress",
      createdAt: "2025-02-10 14:30",
    },
    {
      id: "2",
      bookingId: "BK-2025-012",
      customerName: "Ana Martínez",
      type: "Problema con hotel",
      description: "Habitación no coincide con la reserva",
      status: "open",
      createdAt: "2025-02-10 09:15",
    },
  ]

  const surveys: Survey[] = [
    {
      id: "1",
      bookingId: "BK-2025-034",
      customerName: "Luis Fernández",
      service: "Paquete Europa 15 días",
      rating: 5,
      feedback: "Excelente experiencia, todo perfecto",
      date: "2025-02-09",
    },
    {
      id: "2",
      bookingId: "BK-2025-028",
      customerName: "Sofia Torres",
      service: "Crucero Mediterráneo",
      rating: 4,
      feedback: "Muy bueno, solo mejorar los traslados",
      date: "2025-02-08",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeadphonesIcon className="h-5 w-5 text-[#E91E63]" />
          Gestión Postventa
        </CardTitle>
        <CardDescription>Cancelaciones, reembolsos, reclamos y encuestas</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cancellations">Cancelaciones</TabsTrigger>
            <TabsTrigger value="claims">Reclamos</TabsTrigger>
            <TabsTrigger value="surveys">Encuestas</TabsTrigger>
          </TabsList>

          {/* Cancellations Tab */}
          <TabsContent value="cancellations" className="space-y-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID de reserva o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Reserva</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Servicio</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Penalización (10%)</TableHead>
                    <TableHead>Reembolso (90%)</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cancellations.map((cancel) => (
                    <TableRow key={cancel.id}>
                      <TableCell className="font-medium">{cancel.bookingId}</TableCell>
                      <TableCell>{cancel.customerName}</TableCell>
                      <TableCell className="text-sm">{cancel.service}</TableCell>
                      <TableCell className="font-medium">${cancel.amount}</TableCell>
                      <TableCell className="text-red-600">${cancel.penalty.toFixed(2)}</TableCell>
                      <TableCell className="text-green-600 font-medium">${cancel.refund.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            cancel.status === "approved"
                              ? "default"
                              : cancel.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            cancel.status === "approved" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""
                          }
                        >
                          {cancel.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                          {cancel.status === "approved" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {cancel.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                          {cancel.status === "pending"
                            ? "Pendiente"
                            : cancel.status === "approved"
                              ? "Aprobada"
                              : "Rechazada"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Aprobar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                            <XCircle className="h-4 w-4 mr-1" />
                            Rechazar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar reclamos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Reserva</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.bookingId}</TableCell>
                      <TableCell>{claim.customerName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{claim.type}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{claim.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            claim.status === "resolved"
                              ? "default"
                              : claim.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            claim.status === "resolved"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : claim.status === "in-progress"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : ""
                          }
                        >
                          {claim.status === "open" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {claim.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                          {claim.status === "resolved" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                          {claim.status === "open"
                            ? "Abierto"
                            : claim.status === "in-progress"
                              ? "En Proceso"
                              : "Resuelto"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{claim.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Surveys Tab */}
          <TabsContent value="surveys" className="space-y-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar encuestas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="grid gap-4">
              {surveys.map((survey) => (
                <Card key={survey.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{survey.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {survey.bookingId} • {survey.service}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < survey.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-2 font-semibold">{survey.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{survey.feedback}</p>
                    <p className="text-xs text-muted-foreground">{survey.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Mostrando {surveys.length} encuestas</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
