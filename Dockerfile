# Use a imagem mais recente do Golang disponível no Docker Hub
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
COPY bot.go ./

# Build do executável
RUN go build ./cmd/main.go
RUN go build bot.go

# Exponha a porta 8080 para acesso externo (se necessário)
EXPOSE 8080

# Copie o script de inicialização para o diretório de trabalho
COPY start.sh /app/start.sh

# Defina o diretório de trabalho como /app
WORKDIR /app

# Dê permissão de execução ao script de inicialização
RUN chmod +x /app/start.sh

# Comando a ser executado ao iniciar o contêiner
CMD ["/app/start.sh"]
