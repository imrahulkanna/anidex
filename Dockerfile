FROM node:23.5.0-alpine AS base
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]