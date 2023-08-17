package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "net/http"
)

type Article struct {
    Title       string `json:"title"`
    Description string `json:"description"`
    URL         string `json:"url"`
}

func main() {
    username := "eumicaeu"
    url := fmt.Sprintf("https://dev.to/api/articles?username=%s", username)

    resp, err := http.Get(url)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }

    var articles []Article
    if err := json.Unmarshal(body, &articles); err != nil {
        panic(err)
    }

    for _, article := range articles {
        fmt.Printf("%s: %s\n%s\n\n", article.Title, article.Description, article.URL)
    }
}
