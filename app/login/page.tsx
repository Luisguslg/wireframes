import { LoginRegisterForm } from "@/components/login-register-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with logo */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-block">
            <Image src="/images/viajesucab-logo.png" alt="ViajesUCAB" width={180} height={60} className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-8">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Welcome message and illustration */}
          <div className="hidden md:flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative w-64 h-64">
              {/* Travel illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full text-blue-600 opacity-20" viewBox="0 0 200 200" fill="currentColor">
                  <circle cx="100" cy="100" r="80" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">Bienvenido a ViajesUCAB</h1>
              <p className="text-lg text-gray-600 max-w-md">
                Tu próxima aventura comienza aquí. Descubre destinos increíbles y crea recuerdos inolvidables.
              </p>
            </div>
          </div>

          {/* Right side - Login/Register form */}
          <div className="w-full">
            <LoginRegisterForm />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            Protegemos tus datos conforme a nuestra{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Política de Privacidad
            </Link>{" "}
            y{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Términos de Uso
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
