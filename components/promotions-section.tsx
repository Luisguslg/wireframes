import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Percent, ArrowRight, Flame } from "lucide-react"
import { WishlistButton } from "@/components/wishlist-button"
import Link from "next/link"

const promotions = [
  {
    title: "Caribe Todo Incluido",
    description: "Paquete completo a Cancún con vuelo, hotel 5 estrellas y traslados",
    discount: "30% OFF",
    originalPrice: 1299,
    price: 899,
    savings: 400,
    image: "/cancun-beach-resort.png",
    isHotDeal: true,
  },
  {
    title: "Europa Mágica",
    description: "Tour por París, Roma y Barcelona. 10 días inolvidables",
    discount: "25% OFF",
    originalPrice: 1999,
    price: 1499,
    savings: 500,
    image: "/eiffel-tower-paris.png",
    isHotDeal: true,
  },
  {
    title: "Crucero Mediterráneo",
    description: "Navega por las costas más hermosas del Mediterráneo",
    discount: "40% OFF",
    originalPrice: 2199,
    price: 1299,
    savings: 900,
    image: "/luxury-cruise-ship-mediterranean.jpg",
    isHotDeal: true,
  },
]

export function PromotionsSection() {
  return (
    <section id="promotions" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Percent className="h-6 w-6 text-[#E91E63]" />
              <span className="text-sm font-semibold uppercase tracking-wider text-[#E91E63]">Ofertas Especiales</span>
            </div>
            <h2 className="text-balance text-3xl font-bold md:text-4xl">Promociones Destacadas</h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Aprovecha nuestros descuentos exclusivos por tiempo limitado
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex bg-transparent">
            <Link href="/promociones">
              Ver Todas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <img
                  src={promo.image || "/placeholder.svg"}
                  alt={promo.title}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge className="absolute right-4 top-4 bg-[#E91E63] text-white border-0 text-base px-3 py-1">
                  {promo.discount}
                </Badge>
                {promo.isHotDeal && (
                  <Badge className="absolute left-4 top-4 bg-orange-500 text-white border-0 gap-1">
                    <Flame className="h-3 w-3" />
                    Hot Deal
                  </Badge>
                )}
                <div className="absolute left-4 bottom-4">
                  <WishlistButton itemId={`promo-${index}`} itemName={promo.title} variant="icon" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{promo.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{promo.description}</p>
                <div className="mb-4 border-t pt-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-base text-muted-foreground line-through">
                      ${promo.originalPrice.toLocaleString()}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
                    >
                      Ahorras ${promo.savings}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#E91E63]">${promo.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>
                </div>
                <Button className="w-full bg-[#E91E63] hover:bg-[#E91E63]/90">
                  Reservar Ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/promociones">
              Ver Todas las Promociones
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
