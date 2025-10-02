"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Search, Route, GitCompare, Heart, CreditCard, ArrowRight, ArrowLeft } from "lucide-react"

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  image?: string
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: "Buscador Inteligente",
    description:
      "Encuentra el viaje perfecto con nuestro buscador avanzado. Filtra por destino, fechas, presupuesto y preferencias para descubrir las mejores opciones personalizadas para ti.",
    icon: <Search className="h-12 w-12 text-[#E91E63]" />,
    image: "/travel-search-interface.jpg",
  },
  {
    id: 2,
    title: "Constructor de Itinerarios",
    description:
      "Crea tu viaje ideal agregando múltiples destinos, servicios y actividades. Organiza tu itinerario día por día y visualiza todo tu viaje en un solo lugar antes de reservar.",
    icon: <Route className="h-12 w-12 text-[#E91E63]" />,
    image: "/travel-itinerary-planner.jpg",
  },
  {
    id: 3,
    title: "Comparador de Ofertas",
    description:
      "Compara hasta 4 paquetes lado a lado. Revisa precios, inclusiones, políticas y valoraciones para tomar la mejor decisión informada sobre tu próximo viaje.",
    icon: <GitCompare className="h-12 w-12 text-[#E91E63]" />,
    image: "/comparison-table-interface.jpg",
  },
  {
    id: 4,
    title: "Wishlist y Alertas de Precio",
    description:
      "Guarda tus destinos favoritos y recibe notificaciones cuando los precios bajen. Configura alertas personalizadas y nunca pierdas una oferta especial.",
    icon: <Heart className="h-12 w-12 text-[#E91E63]" />,
    image: "/wishlist-with-price-alerts.jpg",
  },
  {
    id: 5,
    title: "Métodos de Pago Combinados",
    description:
      "Paga como prefieras: tarjetas de crédito/débito, transferencias, Zelle, PayPal y más. Combina múltiples métodos de pago y elige tu moneda preferida (USD, Bs., EUR).",
    icon: <CreditCard className="h-12 w-12 text-[#E91E63]" />,
    image: "/multiple-payment-methods.jpg",
  },
]

interface OnboardingTourProps {
  onComplete?: () => void
  onSkip?: () => void
}

export function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setIsVisible(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setIsVisible(false)
    onComplete?.()
  }

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setIsVisible(false)
    onSkip?.()
  }

  const handleDontShowAgain = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    localStorage.setItem("dontShowOnboardingAgain", "true")
    setIsVisible(false)
  }

  if (!isVisible) return null

  const step = onboardingSteps[currentStep]
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <Card className="relative w-full max-w-2xl overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10"
          onClick={handleSkip}
          aria-label="Cerrar tour"
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="p-8 md:p-12">
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E91E63]/10">{step.icon}</div>
              <div className="text-sm font-medium text-muted-foreground">
                Paso {currentStep + 1} de {onboardingSteps.length}
              </div>
            </div>
            <Progress value={progress} className="mb-6" />
          </div>

          {step.image && (
            <div className="mb-6 overflow-hidden rounded-lg border bg-muted">
              <img src={step.image || "/placeholder.svg"} alt={step.title} className="h-64 w-full object-cover" />
            </div>
          )}

          <div className="mb-8">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl">{step.title}</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">{step.description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {onboardingSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep ? "w-8 bg-[#E91E63]" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir al paso ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button variant="outline" onClick={handlePrevious} className="bg-transparent">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>
              )}
              <Button onClick={handleNext} className="bg-[#E91E63] hover:bg-[#E91E63]/90">
                {currentStep === onboardingSteps.length - 1 ? "Comenzar" : "Siguiente"}
                {currentStep < onboardingSteps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="link" size="sm" onClick={handleDontShowAgain} className="text-muted-foreground">
              No volver a mostrar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
