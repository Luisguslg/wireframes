import { Sparkles } from "lucide-react"

export function PromotionsHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#E91E63]/10 via-background to-primary/5 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E91E63]/10 px-4 py-2">
            <Sparkles className="h-5 w-5 text-[#E91E63]" />
            <span className="text-sm font-semibold text-[#E91E63]">Ofertas Limitadas</span>
          </div>
          <h1 className="text-balance text-4xl font-bold md:text-5xl lg:text-6xl">
            Aprovecha Nuestras Ofertas Exclusivas
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Descuentos especiales en los mejores destinos del mundo
          </p>
        </div>
      </div>
    </section>
  )
}
