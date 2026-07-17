# syntax=docker/dockerfile:1

FROM node:25 AS base
WORKDIR /app


# ---- Dependencies -----------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci


# ---- Development --------------------------------------------------------
# Used by docker-compose.yml: source is bind-mounted, this stage just
# provides node_modules and starts the dev server with hot reload.
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]


# ---- Build ---------------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# ---- Production ------------------------------------------------------
# Minimal runtime image: only the traced standalone server output,
# no source, no full node_modules, no package manager.
FROM node:25-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
