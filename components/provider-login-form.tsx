"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, Lock, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function ProviderLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/proveedor/dashboard")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-blue-900 flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Portal de Proveedores</CardTitle>
        <CardDescription>Gestiona tus servicios y disponibilidad</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider-email">
              <User className="h-4 w-4 inline mr-2" />
              Email de Proveedor
            </Label>
            <Input
              id="provider-email"
              type="email"
              placeholder="proveedor@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="provider-password">
              <Lock className="h-4 w-4 inline mr-2" />
              Contraseña
            </Label>
            <Input
              id="provider-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" size="lg">
            <Building2 className="h-4 w-4 mr-2" />
            Acceder al Portal
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            ¿No tienes cuenta? Contacta a ViajesUCAB para registrarte como proveedor
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
