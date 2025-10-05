"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, FileText, HeartIcon, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ProfileManagement() {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-[#E91E63]" />
          Gestión de Perfil
        </CardTitle>
        <CardDescription>Administra tu información personal y preferencias de viaje</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="personal" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Datos Personales</span>
              <span className="sm:hidden">Datos</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Documentos</span>
              <span className="sm:hidden">Docs</span>
            </TabsTrigger>
            <TabsTrigger value="marital" className="gap-2">
              <HeartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Estado Civil</span>
              <span className="sm:hidden">Estado</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Preferencias</span>
              <span className="sm:hidden">Prefs</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Data Tab */}
          <TabsContent value="personal" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullname">Nombre completo</Label>
                <Input id="fullname" defaultValue="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" type="email" defaultValue="juan.perez@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" defaultValue="+58 412 1234567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                <Input id="birthdate" type="date" defaultValue="1990-05-15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nacionalidad</Label>
                <Select defaultValue="ve">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ve">Venezuela</SelectItem>
                    <SelectItem value="co">Colombia</SelectItem>
                    <SelectItem value="mx">México</SelectItem>
                    <SelectItem value="ar">Argentina</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País de residencia</Label>
                <Select defaultValue="ve">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ve">Venezuela</SelectItem>
                    <SelectItem value="co">Colombia</SelectItem>
                    <SelectItem value="mx">México</SelectItem>
                    <SelectItem value="us">Estados Unidos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección (opcional)</Label>
              <Textarea id="address" placeholder="Calle, ciudad, estado, código postal" rows={3} />
            </div>
            <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">Guardar cambios</Button>
          </TabsContent>

          {/* Travel Documents Tab */}
          <TabsContent value="documents" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Pasaporte</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verificado
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="passport-number">Número de pasaporte</Label>
                    <Input id="passport-number" defaultValue="P12345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passport-expiry">Fecha de vencimiento</Label>
                    <Input id="passport-expiry" type="date" defaultValue="2028-12-31" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passport-country">País emisor</Label>
                    <Select defaultValue="ve">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ve">Venezuela</SelectItem>
                        <SelectItem value="co">Colombia</SelectItem>
                        <SelectItem value="mx">México</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Visa</h3>
                  <Button variant="outline" size="sm">
                    Agregar visa
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">No tienes visas registradas</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Otros documentos</h3>
                  <Button variant="outline" size="sm">
                    Subir documento
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Puedes subir certificados de vacunación, licencias de conducir, etc.
                </p>
              </div>
            </div>
            <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">Guardar cambios</Button>
          </TabsContent>

          {/* Marital Status Tab */}
          <TabsContent value="marital" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="marital-status">Estado civil</Label>
                <Select defaultValue="single">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Soltero/a</SelectItem>
                    <SelectItem value="married">Casado/a</SelectItem>
                    <SelectItem value="divorced">Divorciado/a</SelectItem>
                    <SelectItem value="widowed">Viudo/a</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Esta información nos ayuda a ofrecerte paquetes personalizados como luna de miel o viajes familiares
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h4 className="font-semibold mb-2">Paquetes recomendados para ti</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Escapadas románticas</li>
                  <li>• Viajes de aventura individual</li>
                  <li>• Tours culturales</li>
                </ul>
              </div>
            </div>
            <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">Guardar cambios</Button>
          </TabsContent>

          {/* Travel Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de viaje preferido</Label>
                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    "Familia",
                    "Aventura",
                    "Playa y relax",
                    "Cultural",
                    "Lujo",
                    "Bajo presupuesto",
                    "Naturaleza",
                    "Gastronómico",
                  ].map((pref) => (
                    <label
                      key={pref}
                      className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                    >
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{pref}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Presupuesto promedio por viaje</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Menos de $1,000</SelectItem>
                    <SelectItem value="medium">$1,000 - $3,000</SelectItem>
                    <SelectItem value="high">$3,000 - $5,000</SelectItem>
                    <SelectItem value="luxury">Más de $5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travel-frequency">Frecuencia de viaje</Label>
                <Select defaultValue="quarterly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="biannual">Semestral</SelectItem>
                    <SelectItem value="annual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="special-needs">Necesidades especiales (opcional)</Label>
                <Textarea
                  id="special-needs"
                  placeholder="Alergias, restricciones dietéticas, movilidad reducida, etc."
                  rows={3}
                />
              </div>
            </div>
            <Button className="bg-[#E91E63] hover:bg-[#E91E63]/90">Guardar preferencias</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
