"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Lock, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AdminLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/admin/dashboard")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Panel de Administrador</CardTitle>
        <CardDescription>Acceso exclusivo para personal autorizado de ViajesUCAB</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">
              <User className="h-4 w-4 inline mr-2" />
              Usuario o Email
            </Label>
            <Input
              id="admin-email"
              type="text"
              placeholder="admin@viajesucab.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">
              <Lock className="h-4 w-4 inline mr-2" />
              Contraseña
            </Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" size="lg">
            <Shield className="h-4 w-4 mr-2" />
            Acceder al Panel
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Acceso restringido. Todas las acciones son registradas.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
