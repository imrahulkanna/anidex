FROM node:22.14.0-alpine AS base
RUN apk add --no-cache libc6-compat
RUN addgroup -S appgroup && adduser -S -G appgroup appuser
ENV APP_DIR=/app
WORKDIR ${APP_DIR}
EXPOSE 3000

FROM base AS deps
COPY package*.json .
# for clean installing
RUN npm ci

FROM base AS development
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY public ./public
CMD ["npm", "run", "dev"]

FROM base AS builder
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production

# Copy only necessary files from builder
COPY package*.json .
COPY next.config.mjs .
# The content of 'anidex-432019-6b774e7d1f36.json' (service account key)
# should be provided via an environment variable (e.g., SERVICE_ACCOUNT_JSON)
# at runtime and mounted into the expected path if needed by the application.
COPY --from=deps ${APP_DIR}/node_modules ./node_modules
COPY --from=builder ${APP_DIR}/.next ./.next
COPY --from=builder ${APP_DIR}/public ./public

# Set ownership of the app directory to the new user
RUN chown -R appuser:appgroup ${APP_DIR}
# Switch to the non-root user
USER appuser
ENV HOSTNAME="0.0.0.0"
CMD ["npm", "start"]