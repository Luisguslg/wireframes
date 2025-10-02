# ViajesUCAB Platform

Pequeñas instrucciones para ejecutar y desarrollar el proyecto localmente (sin Docker).

Requisitos
- Node.js 18+ (se recomienda usar la versión detectada: v22 está funcionando en este equipo).
- npm (incluido con Node) o pnpm si prefieres (no es obligatorio).

Comandos útiles
- Instalar dependencias (usar npm si no quieres instalar pnpm):

```powershell
npm install
```

- Ejecutar en modo desarrollo (recarga en caliente):

```powershell
npm run dev
# luego abre http://localhost:3000
```

- Construir para producción:

```powershell
npm run build
```

- Ejecutar en modo producción (usar después de build):

```powershell
npm run start
# por defecto escucha en http://localhost:3000
```

Cambiar puerto (PowerShell)
```powershell
$env:PORT = "4000"
npm run dev
# o para producción
$env:PORT = "4000"
npm run start
```

Detener servidor
- En la terminal donde ejecutaste `npm run dev` o `npm run start`, presiona Ctrl + C.
- Si no tienes la terminal, mata procesos node (cuidado: esto cierra todos los procesos node):

```powershell
Get-Process node | Stop-Process -Force
```

Limpieza y recomendaciones
- No se usa Docker en este repositorio por decisión del propietario.
- Si prefieres pnpm, puedes activarlo con corepack (`corepack enable; corepack prepare pnpm@latest --activate`) y luego ejecutar `pnpm install`.
- Para chequear vulnerabilidades después de instalar paquetes:

```powershell
npm audit
npm audit fix
```

Contacto
- Si quieres que automatice scripts adicionales (`run-dev.ps1`, `run-prod.ps1`) o limpiar dependencias no usadas, dime y lo hago.

Netlify (deploy)
-----------------
Si deseas desplegar en Netlify (recomendado con el plugin Next), puedes conectar este repositorio a Netlify y usar la siguiente configuración.

1. Añadí un `netlify.toml` al repo para integrar con `@netlify/plugin-nextjs`.
2. En Netlify UI: conecta el repo, configura build command `npm run build` y (si solicita) el publish directory `out`.
3. Asegúrate de añadir las variables de entorno necesarias en Netlify (p.ej. cualquier `NEXT_PUBLIC_...` o keys).

Si quieres, puedo hacer el push del branch actual a tu repo remoto para que puedas conectar Netlify inmediatamente.
