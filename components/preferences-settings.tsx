"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Globe, DollarSign, Eye, Type, Palette, Check } from "lucide-react"

interface Language {
  code: string
  name: string
  flag: string
}

interface Currency {
  code: string
  name: string
  symbol: string
  rate: number
}

const languages: Language[] = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

const currencies: Currency[] = [
  { code: "USD", name: "Dólar Estadounidense", symbol: "$", rate: 1 },
  { code: "VES", name: "Bolívar Venezolano", symbol: "Bs.", rate: 36.5 },
  { code: "EUR", name: "Euro", symbol: "€", rate: 0.92 },
  { code: "COP", name: "Peso Colombiano", symbol: "$", rate: 4200 },
  { code: "ARS", name: "Peso Argentino", symbol: "$", rate: 850 },
]

export function PreferencesSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("es")
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD")
  const [fontSize, setFontSize] = useState<string>("medium")
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showPricesInMultipleCurrencies, setShowPricesInMultipleCurrencies] = useState(true)

  const handleSave = () => {
    // Save preferences to localStorage and apply them
    localStorage.setItem("preferred-language", selectedLanguage)
    localStorage.setItem("preferred-currency", selectedCurrency)
    localStorage.setItem("font-size", fontSize)
    localStorage.setItem("high-contrast", String(highContrast))
    localStorage.setItem("reduced-motion", String(reducedMotion))
    localStorage.setItem("show-multiple-currencies", String(showPricesInMultipleCurrencies))

    // In production, this would trigger a page reload or context update
    alert("Preferencias guardadas exitosamente")
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Preferencias y Configuración</h2>
        <p className="mt-2 text-muted-foreground">Personaliza tu experiencia en ViajesUCAB</p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Idioma</h3>
              <p className="text-sm text-muted-foreground">Selecciona tu idioma preferido</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => setSelectedLanguage(language.code)}
                className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                  selectedLanguage === language.code ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <span className="text-3xl">{language.flag}</span>
                <span className="flex-1 text-left font-medium">{language.name}</span>
                {selectedLanguage === language.code && <Check className="h-5 w-5 text-primary" />}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Moneda</h3>
              <p className="text-sm text-muted-foreground">Selecciona tu moneda preferida</p>
            </div>
          </div>

          <div className="space-y-3">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setSelectedCurrency(currency.code)}
                className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                  selectedCurrency === currency.code ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="font-semibold">
                    {currency.symbol} {currency.code}
                  </div>
                  <div className="text-sm text-muted-foreground">{currency.name}</div>
                  {currency.code !== "USD" && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Tasa: {currency.rate} {currency.code} = 1 USD
                    </div>
                  )}
                </div>
                {selectedCurrency === currency.code && <Check className="h-5 w-5 text-primary" />}
              </button>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Label htmlFor="multi-currency" className="text-base font-medium">
                Mostrar precios en múltiples monedas
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Ver equivalencias en tiempo real junto al precio principal
              </p>
            </div>
            <Switch
              id="multi-currency"
              checked={showPricesInMultipleCurrencies}
              onCheckedChange={setShowPricesInMultipleCurrencies}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Accesibilidad</h3>
              <p className="text-sm text-muted-foreground">Ajusta la visualización según tus necesidades</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Label className="text-base font-medium">Tamaño de fuente</Label>
              </div>
              <RadioGroup value={fontSize} onValueChange={setFontSize}>
                <div className="grid gap-3 md:grid-cols-3">
                  <label
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:border-primary/50 ${
                      fontSize === "small" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="small" id="small" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Pequeño</div>
                      <div className="text-xs text-muted-foreground">Texto compacto</div>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:border-primary/50 ${
                      fontSize === "medium" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="medium" id="medium" />
                    <div className="flex-1">
                      <div className="font-medium">Mediano</div>
                      <div className="text-xs text-muted-foreground">Predeterminado</div>
                    </div>
                  </label>
                  <label
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all hover:border-primary/50 ${
                      fontSize === "large" ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="large" id="large" />
                    <div className="flex-1">
                      <div className="font-medium text-lg">Grande</div>
                      <div className="text-xs text-muted-foreground">Más legible</div>
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="high-contrast" className="text-base font-medium">
                    Alto contraste
                  </Label>
                  <p className="text-sm text-muted-foreground">Mejora la legibilidad con colores más contrastantes</p>
                </div>
              </div>
              <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label htmlFor="reduced-motion" className="text-base font-medium">
                    Reducir movimiento
                  </Label>
                  <p className="text-sm text-muted-foreground">Minimiza animaciones y transiciones</p>
                </div>
              </div>
              <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Restablecer valores predeterminados</Button>
          <Button onClick={handleSave} className="bg-[#E91E63] hover:bg-[#E91E63]/90">
            <Check className="mr-2 h-4 w-4" />
            Guardar Preferencias
          </Button>
        </div>
      </div>
    </div>
  )
}
