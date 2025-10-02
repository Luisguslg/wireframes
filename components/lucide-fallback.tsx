// Try to re-export from 'lucide-react' when available, otherwise provide minimal placeholders.
import React from 'react'

// Generic placeholder SVG wrapper used when lucide-react isn't installed.
const Placeholder = (props: any) => (
  <span style={{ display: 'inline-flex', width: props?.width || 16, height: props?.height || 16, alignItems: 'center', justifyContent: 'center' }}>
    <svg width={props?.width || 14} height={props?.height || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="8"/></svg>
  </span>
)

// Try dynamic require of lucide-react. If it's available we'll re-export symbols.
let Lucide: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Lucide = require('lucide-react')
} catch (e) {
  Lucide = null
}

// List of icon names used across the codebase. Each maps to lucide-react if present, otherwise a placeholder.
export const ArrowLeft = Lucide?.ArrowLeft || ((p: any) => <Placeholder {...p} />)
export const ArrowRight = Lucide?.ArrowRight || ((p: any) => <Placeholder {...p} />)
export const ArrowUpDown = Lucide?.ArrowUpDown || ((p: any) => <Placeholder {...p} />)
export const Award = Lucide?.Award || ((p: any) => <Placeholder {...p} />)
export const Ban = Lucide?.Ban || ((p: any) => <Placeholder {...p} />)
export const BarChart3 = Lucide?.BarChart3 || ((p: any) => <Placeholder {...p} />)
export const Check = Lucide?.Check || ((p: any) => <Placeholder {...p} />)
export const CheckCircle2 = Lucide?.CheckCircle2 || ((p: any) => <Placeholder {...p} />)
export const ChevronLeft = Lucide?.ChevronLeft || ((p: any) => <Placeholder {...p} />)
export const ChevronRight = Lucide?.ChevronRight || ((p: any) => <Placeholder {...p} />)
export const Circle = Lucide?.Circle || ((p: any) => <Placeholder {...p} />)
export const Clock = Lucide?.Clock || ((p: any) => <Placeholder {...p} />)
export const Cloud = Lucide?.Cloud || ((p: any) => <Placeholder {...p} />)
export const Code = Lucide?.Code || ((p: any) => <Placeholder {...p} />)
export const Copy = Lucide?.Copy || ((p: any) => <Placeholder {...p} />)
export const CreditCard = Lucide?.CreditCard || ((p: any) => <Placeholder {...p} />)
export const DollarSign = Lucide?.DollarSign || ((p: any) => <Placeholder {...p} />)
export const Download = Lucide?.Download || ((p: any) => <Placeholder {...p} />)
export const Edit = Lucide?.Edit || ((p: any) => <Placeholder {...p} />)
export const Eye = Lucide?.Eye || ((p: any) => <Placeholder {...p} />)
export const EyeOff = Lucide?.EyeOff || ((p: any) => <Placeholder {...p} />)
export const Filter = Lucide?.Filter || ((p: any) => <Placeholder {...p} />)
export const Flame = Lucide?.Flame || ((p: any) => <Placeholder {...p} />)
export const GitCompare = Lucide?.GitCompare || ((p: any) => <Placeholder {...p} />)
export const Globe = Lucide?.Globe || ((p: any) => <Placeholder {...p} />)
export const Heart = Lucide?.Heart || ((p: any) => <Placeholder {...p} />)
export const HeartIcon = Heart
export const Hotel = Lucide?.Hotel || ((p: any) => <Placeholder {...p} />)
export const Info = Lucide?.Info || ((p: any) => <Placeholder {...p} />)
export const Leaf = Lucide?.Leaf || ((p: any) => <Placeholder {...p} />)
export const Lock = Lucide?.Lock || ((p: any) => <Placeholder {...p} />)
export const MapPin = Lucide?.MapPin || ((p: any) => <Placeholder {...p} />)
export const Megaphone = Lucide?.Megaphone || ((p: any) => <Placeholder {...p} />)
export const Percent = Lucide?.Percent || ((p: any) => <Placeholder {...p} />)
export const Palette = Lucide?.Palette || ((p: any) => <Placeholder {...p} />)
export const Package = Lucide?.Package || ((p: any) => <Placeholder {...p} />)
export const Plane = Lucide?.Plane || ((p: any) => <Placeholder {...p} />)
export const Plus = Lucide?.Plus || ((p: any) => <Placeholder {...p} />)
export const Plug = Lucide?.Plug || ((p: any) => <Placeholder {...p} />)
export const PlugZap = Lucide?.PlugZap || ((p: any) => <Placeholder {...p} />)
export const Plug2 = Lucide?.Plug2 || ((p: any) => <Placeholder {...p} />)
export const PlugZap2 = PlugZap
export const PlugIcon = Plug
export const PlugShield = Lucide?.Shield || ((p: any) => <Placeholder {...p} />)
export const PlusCircle = Lucide?.PlusCircle || ((p: any) => <Placeholder {...p} />)
export const Route = Lucide?.Route || Lucide?.MapPin || ((p: any) => <Placeholder {...p} />)
export const Save = Lucide?.Save || ((p: any) => <Placeholder {...p} />)
export const Search = Lucide?.Search || ((p: any) => <Placeholder {...p} />)
export const Send = Lucide?.Send || ((p: any) => <Placeholder {...p} />)
export const Settings = Lucide?.Settings || ((p: any) => <Placeholder {...p} />)
export const Shield = Lucide?.Shield || ((p: any) => <Placeholder {...p} />)
export const Ship = Lucide?.Ship || ((p: any) => <Placeholder {...p} />)
export const ShoppingCart = Lucide?.ShoppingCart || ((p: any) => <Placeholder {...p} />)
export const Sparkles = Lucide?.Sparkles || ((p: any) => <Placeholder {...p} />)
export const Star = Lucide?.Star || ((p: any) => <Placeholder {...p} />)
export const Tag = Lucide?.Tag || ((p: any) => <Placeholder {...p} />)
export const Ticket = Lucide?.Ticket || ((p: any) => <Placeholder {...p} />)
export const Trash2 = Lucide?.Trash2 || ((p: any) => <Placeholder {...p} />)
export const Type = Lucide?.Type || ((p: any) => <Placeholder {...p} />)
export const Users = Lucide?.Users || ((p: any) => <Placeholder {...p} />)
export const User = Lucide?.User || ((p: any) => <Placeholder {...p} />)
export const UserCog = Lucide?.UserCog || ((p: any) => <Placeholder {...p} />)
export const Utensils = Lucide?.Utensils || ((p: any) => <Placeholder {...p} />)
export const X = Lucide?.X || ((p: any) => <Placeholder {...p} />)
export const XIcon = X

export default Lucide
