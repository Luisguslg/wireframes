"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Info, ExternalLink } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CarbonOffsetCardProps {
  totalCarbonKg: number
  offsetCostPerKg?: number
  onToggleOffset?: (enabled: boolean, amount: number) => void
}

export function CarbonOffsetCard({ totalCarbonKg, offsetCostPerKg = 0.015, onToggleOffset }: CarbonOffsetCardProps) {
  const [offsetEnabled, setOffsetEnabled] = useState(false)
  const offsetAmount = totalCarbonKg * offsetCostPerKg

  const handleToggle = (checked: boolean) => {
    setOffsetEnabled(checked)
    onToggleOffset?.(checked, checked ? offsetAmount : 0)
  }

  const equivalentTrees = Math.ceil(totalCarbonKg / 21)
  const equivalentCars = (totalCarbonKg / 4600).toFixed(2)

  return (
    <Card className="overflow-hidden border-green-200 bg-green-50/50">
      <div className="border-b border-green-200 bg-green-100/50 p-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-700" />
          <h3 className="font-semibold text-green-900">Huella de Carbono de tu Viaje</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                <Info className="h-4 w-4 text-green-700" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Cómo calculamos la huella de carbono?</DialogTitle>
                <DialogDescription className="space-y-3 pt-4">
                  <p>Calculamos las emisiones de CO₂ basándonos en múltiples factores de tu viaje:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Vuelos:</strong> Distancia, tipo de aeronave y clase de servicio
                    </li>
                    <li>
                      <strong>Alojamiento:</strong> Tipo de hotel y número de noches
                    </li>
                    <li>
                      <strong>Transporte terrestre:</strong> Traslados y tours incluidos
                    </li>
                    <li>
                      <strong>Actividades:</strong> Excursiones y servicios adicionales
                    </li>
                  </ul>
                  <p className="text-sm">
                    Utilizamos estándares internacionales de la ICAO (Organización de Aviación Civil Internacional) y el
                    GHG Protocol para garantizar cálculos precisos.
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-green-900">
              {totalCarbonKg.toFixed(1)} <span className="text-lg font-normal">kg CO₂</span>
            </div>
            <p className="text-sm text-green-700 mt-1">Emisiones estimadas de tu viaje</p>
          </div>
          <Badge variant="outline" className="border-green-300 text-green-700">
            Calculado
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-white p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-900">{equivalentTrees}</div>
            <div className="text-xs text-green-700">árboles necesarios para compensar</div>
          </div>
          <div className="rounded-lg bg-white p-3 border border-green-200">
            <div className="text-2xl font-bold text-green-900">{equivalentCars}</div>
            <div className="text-xs text-green-700">años de emisiones de un auto</div>
          </div>
        </div>

        <div className="rounded-lg border border-green-300 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <Label htmlFor="carbon-offset" className="text-base font-semibold text-green-900">
              Compensar mi huella de carbono
            </Label>
            <Switch id="carbon-offset" checked={offsetEnabled} onCheckedChange={handleToggle} />
          </div>

          {offsetEnabled && (
            <div className="space-y-3 pt-3 border-t border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Costo de compensación:</span>
                <span className="text-lg font-bold text-green-900">${offsetAmount.toFixed(2)} USD</span>
              </div>
              <p className="text-xs text-green-700 leading-relaxed">
                Tu contribución apoyará proyectos certificados de reforestación, energía renovable y conservación que
                reducen las emisiones de CO₂ en la atmósfera.
              </p>
              <Button variant="link" size="sm" className="h-auto p-0 text-green-700 hover:text-green-900" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Ver proyectos de compensación
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
            </div>
          )}

          {!offsetEnabled && (
            <p className="text-xs text-green-700 leading-relaxed">
              Activa esta opción para compensar las emisiones de CO₂ de tu viaje apoyando proyectos ambientales
              certificados.
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-green-700">
          <Leaf className="h-4 w-4" />
          <span>Certificado de compensación incluido al finalizar tu compra</span>
        </div>
      </div>
    </Card>
  )
}
