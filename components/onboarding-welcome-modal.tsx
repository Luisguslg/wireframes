"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight } from "lucide-react"

interface OnboardingWelcomeModalProps {
  onStartTour?: () => void
  onSkip?: () => void
}

export function OnboardingWelcomeModal({ onStartTour, onSkip }: OnboardingWelcomeModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user is new (first visit)
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      // Show welcome modal after a short delay
      setTimeout(() => setIsVisible(true), 500)
    }
  }, [])

  const handleStartTour = () => {
    localStorage.setItem("hasSeenWelcome", "true")
    setIsVisible(false)
    onStartTour?.()
  }

  const handleSkip = () => {
    localStorage.setItem("hasSeenWelcome", "true")
    localStorage.setItem("hasSeenOnboarding", "true")
    setIsVisible(false)
    onSkip?.()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="relative w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-br from-[#E91E63]/10 via-background to-background p-8 md:p-12">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E91E63]/10">
              <Sparkles className="h-10 w-10 text-[#E91E63]" />
            </div>
          </div>

          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Bienvenido a ViajesUCAB</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Tu agencia de viajes de confianza. Descubre un mundo de posibilidades con nuestras herramientas
              inteligentes diseñadas para hacer tu experiencia de viaje inolvidable.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleStartTour} className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90" size="lg">
              Hacer el Tour Guiado
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button onClick={handleSkip} variant="outline" className="w-full bg-transparent" size="lg">
              Explorar por mi cuenta
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            El tour solo toma 2 minutos y te mostrará las mejores características
          </p>
        </div>
      </Card>
    </div>
  )
}
