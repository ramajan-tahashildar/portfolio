# Multi-stage Dockerfile for Next.js production build

FROM node:18-alpine AS deps
WORKDIR /app
# copy lockfiles and package manifest(s)
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
# install dependencies (falls back to npm install when ci isn't available)
RUN npm ci || npm install

FROM node:18-alpine AS builder
WORKDIR /app
# copy node_modules from deps stage to speed up install
COPY --from=deps /app/node_modules ./node_modules
# copy app sources
COPY . .
# build the Next.js app
RUN npm run build

FROM node:18-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
# non-root user for security
RUN addgroup -S app && adduser -S -G app app
# copy only what's needed to run the app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
USER app
EXPOSE 3000
# default command: expects a `start` script (e.g., `next start`) in package.json
CMD ["npm","run","start"]
