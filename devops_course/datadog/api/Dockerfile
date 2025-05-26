FROM golang:1.22.1 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 go build -o api

FROM alpine:3.19 AS runner

WORKDIR /app

COPY --from=builder /app/api ./

CMD ["/app/api"]