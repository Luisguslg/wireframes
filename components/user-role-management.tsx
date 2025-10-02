"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCog, Search, Plus, Edit, Ban, CheckCircle2 } from "lucide-react"
import { useState } from "react"

export function UserRoleManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      role: "Cliente",
      status: "active",
      joined: "15 Ene 2025",
    },
    {
      id: 2,
      name: "María González",
      email: "maria.gonzalez@email.com",
      role: "Cliente",
      status: "active",
      joined: "10 Feb 2025",
    },
    {
      id: 3,
      name: "Carlos Rodríguez",
      email: "carlos@viajesucab.com",
      role: "Agente",
      status: "active",
      joined: "01 Dic 2024",
    },
    {
      id: 4,
      name: "Ana Martínez",
      email: "ana@viajesucab.com",
      role: "Soporte",
      status: "active",
      joined: "20 Nov 2024",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Create User */}
      <Card>
        <CardHeader className="bg-slate-900 text-white">
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Crear Nuevo Usuario
          </CardTitle>
          <CardDescription className="text-slate-300">Agregar usuario al sistema</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="user-name">Nombre Completo</Label>
              <Input id="user-name" placeholder="Nombre del usuario" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input id="user-email" type="email" placeholder="email@ejemplo.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-role">Rol</Label>
              <Select>
                <SelectTrigger id="user-role">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="agent">Agente</SelectItem>
                  <SelectItem value="support">Soporte</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-password">Contraseña Temporal</Label>
              <Input id="user-password" type="password" placeholder="••••••••" />
            </div>
          </div>
          <Button className="w-full bg-slate-900 hover:bg-slate-800">
            <Plus className="h-4 w-4 mr-2" />
            Crear Usuario
          </Button>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5 text-[#E91E63]" />
            Gestión de Usuarios
          </CardTitle>
          <CardDescription>Administrar cuentas y permisos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Users Table */}
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold">{user.name}</p>
                    <Badge
                      variant={
                        user.role === "Administrador" ? "default" : user.role === "Agente" ? "secondary" : "outline"
                      }
                    >
                      {user.role}
                    </Badge>
                    {user.status === "active" ? (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Activo
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <Ban className="h-3 w-3 mr-1" />
                        Suspendido
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">Registrado: {user.joined}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Ban className="h-4 w-4 mr-1" />
                    Suspender
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
