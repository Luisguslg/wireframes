"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HelpCircle, BookOpen, Video, MessageCircle, RotateCcw } from "lucide-react"

export function HelpMenu() {
  const handleRestartTour = () => {
    localStorage.removeItem("hasSeenOnboarding")
    localStorage.removeItem("hasSeenWelcome")
    localStorage.removeItem("dontShowOnboardingAgain")
    window.location.reload()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Ayuda y Soporte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRestartTour} className="cursor-pointer">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reiniciar Tour Guiado
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/ayuda" className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" />
            Centro de Ayuda
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/tutoriales" className="cursor-pointer">
            <Video className="mr-2 h-4 w-4" />
            Video Tutoriales
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/contacto" className="cursor-pointer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Contactar Soporte
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
