"use client"

import type React from "react"

import { useState } from "react"
import { OnboardingWelcomeModal } from "@/components/onboarding-welcome-modal"
import { OnboardingTour } from "@/components/onboarding-tour"

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [showTour, setShowTour] = useState(false)

  const handleStartTour = () => {
    setShowTour(true)
  }

  const handleCompleteTour = () => {
    setShowTour(false)
  }

  const handleSkipTour = () => {
    setShowTour(false)
  }

  return (
    <>
      {children}
      <OnboardingWelcomeModal onStartTour={handleStartTour} onSkip={() => setShowTour(false)} />
      {showTour && <OnboardingTour onComplete={handleCompleteTour} onSkip={handleSkipTour} />}
    </>
  )
}
