package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	url := "https://tectec.dev"

	for {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Printf("A solicitação não foi bem-sucedida: %v\n", err)
		} else {
			if resp.StatusCode == http.StatusOK {
				fmt.Println("Solicitação bem-sucedida!")
			} else {
				fmt.Printf("A solicitação não foi bem-sucedida. Código de status: %d\n", resp.StatusCode)
			}
		}

		time.Sleep(5 * time.Second)
	}
}
