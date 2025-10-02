"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface WishlistButtonProps {
  itemId: string
  itemName: string
  variant?: "default" | "icon"
  className?: string
  onToggle?: (itemId: string, isInWishlist: boolean) => void
}

export function WishlistButton({ itemId, itemName, variant = "default", className, onToggle }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = () => {
    setIsInWishlist(!isInWishlist)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
    onToggle?.(itemId, !isInWishlist)
  }

  if (variant === "icon") {
    return (
      <Button
        size="icon"
        variant="secondary"
        className={cn("h-9 w-9 bg-white/90 hover:bg-white", className)}
        onClick={handleToggle}
        aria-label={isInWishlist ? "Quitar de lista de deseos" : "Agregar a lista de deseos"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-all",
            isAnimating && "scale-125",
            isInWishlist && "fill-[#E91E63] text-[#E91E63]",
          )}
        />
      </Button>
    )
  }

  return (
    <Button variant="outline" className={cn("bg-transparent", className)} onClick={handleToggle}>
      <Heart
        className={cn(
          "mr-2 h-4 w-4 transition-all",
          isAnimating && "scale-125",
          isInWishlist && "fill-[#E91E63] text-[#E91E63]",
        )}
      />
      {isInWishlist ? "En Lista de Deseos" : "Agregar a Deseos"}
    </Button>
  )
}
