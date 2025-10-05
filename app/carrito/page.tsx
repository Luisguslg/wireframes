import { Header } from "@/components/header"
import { CartCheckout } from "@/components/cart-checkout"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <CartCheckout />
      <Footer />
    </div>
  )
}
