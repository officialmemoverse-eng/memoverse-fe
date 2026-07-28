# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p public
ENV NEXT_PUBLIC_API_URL=http://202.155.94.92:8082/api/v1
RUN npm run build

# Production stage (Standalone - Ultra Fast & Small ~120MB)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
