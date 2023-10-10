package main

import (
    "fmt"
    "net/http"
    "time"
)

func main() {
    siteURL := "https://www.tectec.dev"

    ticker := time.NewTicker(10 * time.Second)

    for range ticker.C {
        _, err := http.Get(siteURL)

        if err != nil {
            fmt.Printf("Erro ao pingar o site %s: %s\n", siteURL, err)
        } else {
            fmt.Printf("Ping em %s bem-sucedido.\n", siteURL)
        }
    }
}
