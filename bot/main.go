package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	url := "http://tectec.dev" 

	for {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Println("Erro ao fazer a requisição:", err)
			time.Sleep(5 * time.Second)
			continue
		}

		fmt.Println("Código de status da resposta:", resp.StatusCode)

		resp.Body.Close()

		time.Sleep(5 * time.Second) // Intervalo entre as requisições
	}
}