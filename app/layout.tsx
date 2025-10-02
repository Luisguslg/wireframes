import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "ViajesUCAB - Tu Agencia de Confianza",
  description: "Plataforma de reservas de viajes con 17 años de experiencia. Vuelos, hoteles, cruceros y más.",
  generator: "viajesucab.app",
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="es">
      <body className={`font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
