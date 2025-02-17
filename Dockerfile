FROM node:23.5.0-alpine AS base
RUN apk add --no-cache libc6-compat
ENV APP_DIR=/app
WORKDIR ${APP_DIR}
EXPOSE 3000

FROM base AS deps
COPY package*.json .
# for clean installing
RUN npm ci

FROM base AS development
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
CMD ["npm", "run", "dev"]

FROM base AS builder
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
COPY --from=builder ${APP_DIR}/.next ./.next
COPY --from=builder ${APP_DIR}/public ./public
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]