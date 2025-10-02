How to run and deploy ViajesUCAB

Run locally (Windows PowerShell)
- This project uses pnpm. If you don't have it, install via npm (requires Node.js installed):
  npm install -g pnpm
- Install dependencies and run dev server:
  pnpm install
  pnpm dev

Build and run production locally:
  pnpm build
  pnpm start

If you truly don't want to install pnpm, you can use npm as a fallback, but pnpm is recommended for this repo.

Commit changes (if your folder is not yet a git repo):
  git init
  git add -A
  git commit -m "chore: remove v0 references and sanitize logs/metadata"

Deployment options

1) Docker (recommended for consistency)
- Build image on your server:
  docker build -t viajesucab:latest .
- Run container:
  docker run -d -p 3000:3000 --name viajesucab viajesucab:latest

2) Node + PM2 on a Linux server
- On server (assumes Node 20+ installed):
  # copy files to server (rsync/scp)
  pnpm install --production
  pnpm build
  pnpm start
  # or use PM2 to keep it running
  npm install -g pm2
  pm2 start "pnpm start" --name viajesucab

Notes
- If your server doesn't have pnpm, you can install it globally with npm.
- For SSL/HTTPS and hostname, place a reverse proxy (nginx) in front of the app and terminate TLS there.
