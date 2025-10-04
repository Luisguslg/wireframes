Base URL: https://wireframes-nine.vercel.app/

Esta lista enumera las rutas públicas y privadas del proyecto, organizadas por categorías, y muestra ejemplos completos usando la dirección indicada arriba.

---

# Rutas del proyecto (con categorías)

## Páginas públicas
- /                      — Home
  - Ejemplo: https://wireframes-nine.vercel.app/
- /buscar                — Resultados de búsqueda
  - Ejemplo: https://wireframes-nine.vercel.app/buscar
- /paquetes              — Listado y destacados de paquetes
  - Ejemplo: https://wireframes-nine.vercel.app/paquetes
- /promociones           — Promociones
  - Ejemplo: https://wireframes-nine.vercel.app/promociones
- /comparar              — Comparador de ofertas
  - Ejemplo: https://wireframes-nine.vercel.app/comparar
- /itinerario            — Constructor de itinerarios
  - Ejemplo: https://wireframes-nine.vercel.app/itinerario
- /carrito               — Carrito / Checkout
  - Ejemplo: https://wireframes-nine.vercel.app/carrito
- /login                 — Login / registro de usuarios
  - Ejemplo: https://wireframes-nine.vercel.app/login
- /perfil                — Perfil / dashboard del usuario
  - Ejemplo: https://wireframes-nine.vercel.app/perfil
- /preferencias          — Configuración / preferencias
  - Ejemplo: https://wireframes-nine.vercel.app/preferencias
- /reclamos              — Reclamos y encuestas
  - Ejemplo: https://wireframes-nine.vercel.app/reclamos

## Rutas públicas (detalles de servicio / confirmación) — dinámicas
- /servicio/[id]         — Página de detalles del servicio (id dinámico)
  - Ejemplo: https://wireframes-nine.vercel.app/servicio/42
- /confirmacion/[id]     — Página de confirmación de reserva/compra
  - Ejemplo: https://wireframes-nine.vercel.app/confirmacion/abc123

## Área de administración (admin)
- /admin/login           — Login para administradores
  - Ejemplo: https://wireframes-nine.vercel.app/admin/login
- /admin/dashboard       — Panel de administración
  - Ejemplo: https://wireframes-nine.vercel.app/admin/dashboard

## Portal de proveedores
- /proveedor/login       — Login para proveedores
  - Ejemplo: https://wireframes-nine.vercel.app/proveedor/login
- /proveedor/dashboard   — Panel del proveedor
  - Ejemplo: https://wireframes-nine.vercel.app/proveedor/dashboard

## Notas rápidas
- Rutas dinámicas: sustituye `[id]` por el identificador real (por ejemplo un id de servicio o una referencia de reserva).
- Para probar localmente utiliza `npm run dev` y abre `http://localhost:3000/<ruta>`.
- Asegúrate de que los recursos públicos referenciados (por ejemplo `/images/viajesucab-logo.png`) existan en `public/` si vas a usar la URL directa.

---

Si quieres que añada esto al README principal o que haga un commit con este archivo y lo suba al remoto, dime y lo hago ahora.
