# Use a versão mais recente do Golang disponível no Docker Hub
FROM golang:1.20

# Defina o diretório de trabalho como /build
WORKDIR /build

# Copie os arquivos necessários para o diretório de trabalho
COPY go.mod go.sum ./
COPY static ./static
COPY views ./views
COPY database ./database
COPY middlewares ./middlewares
COPY routes ./routes
COPY handlers ./handlers
COPY cmd ./cmd

# Build do executável
RUN go build -o main ./cmd/main.go

# Exponha a porta 8080 para acesso externo
EXPOSE 8080

# Comando a ser executado ao iniciar o contêiner
CMD ["./main"]
