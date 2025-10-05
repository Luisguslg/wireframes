"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Download, Calendar, MapPin, Award } from "lucide-react"

interface CompensationRecord {
  id: string
  tripName: string
  destination: string
  date: string
  carbonKg: number
  offsetAmount: number
  currency: string
  certificateUrl: string
  projectName: string
  projectType: "reforestation" | "renewable" | "conservation"
}

export function SustainabilityHistory() {
  const compensations: CompensationRecord[] = [
    {
      id: "1",
      tripName: "Paquete Caribe Todo Incluido",
      destination: "Cancún, México",
      date: "2024-12-15",
      carbonKg: 850,
      offsetAmount: 12.75,
      currency: "USD",
      certificateUrl: "#",
      projectName: "Reforestación Amazónica",
      projectType: "reforestation",
    },
    {
      id: "2",
      tripName: "Europa Mágica Premium",
      destination: "París, Roma, Barcelona",
      date: "2024-10-20",
      carbonKg: 1450,
      offsetAmount: 21.75,
      currency: "USD",
      certificateUrl: "#",
      projectName: "Energía Solar en India",
      projectType: "renewable",
    },
    {
      id: "3",
      tripName: "Tour Machu Picchu",
      destination: "Cusco, Perú",
      date: "2024-08-10",
      carbonKg: 620,
      offsetAmount: 9.3,
      currency: "USD",
      certificateUrl: "#",
      projectName: "Conservación de Bosques Andinos",
      projectType: "conservation",
    },
  ]

  const totalCarbonOffset = compensations.reduce((sum, comp) => sum + comp.carbonKg, 0)
  const totalAmountPaid = compensations.reduce((sum, comp) => sum + comp.offsetAmount, 0)
  const equivalentTrees = Math.ceil(totalCarbonOffset / 21)

  const getProjectTypeLabel = (type: string) => {
    const labels = {
      reforestation: "Reforestación",
      renewable: "Energía Renovable",
      conservation: "Conservación",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getProjectTypeColor = (type: string) => {
    const colors = {
      reforestation: "bg-green-100 text-green-700 border-green-300",
      renewable: "bg-blue-100 text-blue-700 border-blue-300",
      conservation: "bg-amber-100 text-amber-700 border-amber-300",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Mi Impacto Ambiental</h2>
        <p className="mt-2 text-muted-foreground">Historial de compensaciones de carbono y certificados</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="p-6 border-green-200 bg-green-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{totalCarbonOffset.toFixed(0)}</div>
              <div className="text-xs text-green-700">kg CO₂ compensados</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-green-200 bg-green-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Award className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">{equivalentTrees}</div>
              <div className="text-xs text-green-700">árboles equivalentes</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-green-200 bg-green-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Leaf className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-900">${totalAmountPaid.toFixed(2)}</div>
              <div className="text-xs text-green-700">invertidos en sostenibilidad</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Historial de Compensaciones</h3>

        {compensations.map((comp) => (
          <Card key={comp.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{comp.tripName}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{comp.destination}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={getProjectTypeColor(comp.projectType)}>
                    {getProjectTypeLabel(comp.projectType)}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(comp.date)}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">CO₂ compensado:</span>
                    <span className="ml-2 font-semibold text-green-700">{comp.carbonKg} kg</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Monto:</span>
                    <span className="ml-2 font-semibold">
                      ${comp.offsetAmount} {comp.currency}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2">Proyecto: {comp.projectName}</p>
              </div>

              <div className="flex md:flex-col gap-2">
                <Button variant="outline" size="sm" className="bg-transparent" asChild>
                  <a href={comp.certificateUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Certificado
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {compensations.length === 0 && (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Leaf className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">Aún no has compensado emisiones</h3>
          <p className="mb-6 text-muted-foreground">
            Comienza a compensar la huella de carbono de tus viajes y contribuye al medio ambiente
          </p>
        </Card>
      )}
    </div>
  )
}
