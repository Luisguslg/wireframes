import { EnhancedSurvey } from "@/components/enhanced-survey"

export default function EncuestasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Encuesta de Satisfacción</h1>
          <p className="text-muted-foreground">Tu opinión nos ayuda a mejorar nuestros servicios</p>
        </div>
        <EnhancedSurvey />
      </div>
    </div>
  )
}
