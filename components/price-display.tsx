"use client"

import { useState, useEffect } from "react"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PriceDisplayProps {
  amount: number
  baseCurrency?: string
  showMultipleCurrencies?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

interface ExchangeRate {
  code: string
  symbol: string
  rate: number
}

const exchangeRates: ExchangeRate[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "VES", symbol: "Bs.", rate: 36.5 },
  { code: "EUR", symbol: "€", rate: 0.92 },
]

export function PriceDisplay({
  amount,
  baseCurrency = "USD",
  showMultipleCurrencies = true,
  size = "md",
  className = "",
}: PriceDisplayProps) {
  const [preferredCurrency, setPreferredCurrency] = useState<string>("USD")
  const [showAlternatives, setShowAlternatives] = useState(showMultipleCurrencies)

  useEffect(() => {
    // Load preferred currency from localStorage
    const saved = localStorage.getItem("preferred-currency")
    if (saved) setPreferredCurrency(saved)

    const savedShowMultiple = localStorage.getItem("show-multiple-currencies")
    if (savedShowMultiple) setShowAlternatives(savedShowMultiple === "true")
  }, [])

  const getConvertedAmount = (targetCurrency: string) => {
    const baseRate = exchangeRates.find((r) => r.code === baseCurrency)?.rate || 1
    const targetRate = exchangeRates.find((r) => r.code === targetCurrency)?.rate || 1
    return (amount / baseRate) * targetRate
  }

  const formatAmount = (value: number, currency: string) => {
    const rate = exchangeRates.find((r) => r.code === currency)
    if (!rate) return `${value.toFixed(2)}`

    if (currency === "VES") {
      return `${rate.symbol}${value.toFixed(0)}`
    }
    return `${rate.symbol}${value.toFixed(2)}`
  }

  const primaryAmount = getConvertedAmount(preferredCurrency)
  const primaryRate = exchangeRates.find((r) => r.code === preferredCurrency)

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className={className}>
      <div className={`${sizeClasses[size]} font-bold text-primary`}>
        {formatAmount(primaryAmount, preferredCurrency)}
        <span className="text-sm font-normal text-muted-foreground ml-1">{preferredCurrency}</span>
      </div>

      {showAlternatives && preferredCurrency !== baseCurrency && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground cursor-help">
                <span>
                  {exchangeRates
                    .filter((r) => r.code !== preferredCurrency)
                    .slice(0, 2)
                    .map((rate) => formatAmount(getConvertedAmount(rate.code), rate.code))
                    .join(" • ")}
                </span>
                <Info className="h-3 w-3" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p className="font-semibold">Equivalencias:</p>
                {exchangeRates.map((rate) => (
                  <div key={rate.code} className="flex justify-between gap-4">
                    <span>{rate.code}:</span>
                    <span className="font-medium">{formatAmount(getConvertedAmount(rate.code), rate.code)}</span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground mt-2">Tasas actualizadas diariamente</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
