FROM node:24.0-alpine AS builder

WORKDIR /app
COPY . .

RUN npm ci && npm run build

FROM nginx:1.28.0-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]